import express from "express";
import {commentSchema} from '../Helper/schemaValidation'
import noteModel from "../Model/noteModel";
import commentModel from "../Model/commentModel"
import dotenv from "dotenv"
dotenv.config()
const router = express.Router();


// get all comments for a note
router.get('/:id', async(req, res, next) => {
    try {
        // console.log(req.params.id) 
        const noteId = req.params.id   
        const comments = await commentModel.find({noteId})
        console.log("comments")
        res.send(comments);
        
    } catch (error) {
        next(error)
    }
})

// post comment
router.post('/', async(req, res, next) => {
    try {
        // console.log(req.params.id) 
        console.log("object", req.body)
        const comment = await commentSchema.validateAsync(req.body)
        
        const newComment = new commentModel(comment)
        await newComment.save()

        console.log(newComment)
        res.send(newComment);
        
    } catch (error) {
        next(error)
    }
})





export = router