import express from "express";
import User from "../Model/userModel";
import createError from "http-errors"
import {registerSchema, loginSchema} from "../Helper/schemaValidation"
import authModule from "../Helper/jwtHelper"
import dotenv from "dotenv"
dotenv.config()
const router = express.Router();

// Register new member
router.post("/register" , async (req , res , next) => {
    try {
        console.log("register")
        const result = await registerSchema.validateAsync(req.body);

        const doesExist = await User.findOne({email: result.email})

        if(doesExist){
            throw createError.Conflict(`The ${result.email} already exists`);
        }
        
        if(!result.hasOwnProperty("villaOwner"))
            result.villaOwner = false;

        const user = new User(result);
        const savedUser = await user.save();


        const aToken = await authModule.signAccessToken(savedUser.id);
        const rToken = await authModule.signRefreshToken(savedUser.id);

        // res.cookie("accessToken", aToken);

        res.status(201).json({accessToken: aToken, refreshToken: rToken});
        
    } catch (error: any){
        if(error.isJoi == true)
            error.status = 422;

        next(error);
    }  
})

//Login
router.post("/login", async (req, res, next) => {
    try {
        console.log("login")
        const result = await loginSchema.validateAsync(req.body);

        const doesExist = await User.findOne({email: result.email})

        if(!doesExist)
            throw createError.NotFound("User not found");

        const doesMatch = await doesExist.isValidPassword(result.password);

        if(!doesMatch){
            throw createError.Unauthorized("Password is invalid");  
        }

        const aToken = await authModule.signAccessToken(doesExist.id);
        const rToken = await authModule.signRefreshToken(doesExist.id);

        res.cookie("accessToken", aToken);

        res.status(200).send({accessToken: aToken, refreshToken: rToken})

    } catch (error: any){
        console.log(error)
        if(error.isJoi == true)
            error.status = 422;
            
        next(error);
    }  
})

export = router;

