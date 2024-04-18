import jwt from 'jsonwebtoken'

import createError from 'http-errors'
import dotenv from "dotenv"
dotenv.config()

const authModule = {
    signAccessToken: function (userId: string){
        return new Promise((resolve, reject) => {
            const payload = {};
            const secret = process.env.ACCESS_TOKEN_SECRET || "super Secret key";
            const options = {
                audience: userId,
                expiresIn: '1d',
                issuer: 'bhartiking.com'
            };
            jwt.sign(payload, secret, options, (err, token) => {
                if(err)
                    return reject(err)
                resolve(token)
            })
        })
    },

    signRefreshToken: function (userId: string): Promise<string>{
        return new Promise((resolve, reject) => {
            const payload = {};
            const secret = process.env.REFRESH_TOKEN_SECRET || "super Secret key";
            const options = {
                audience: userId,
                expiresIn: '7d',
                issuer: 'bhartiking.com'
            };
            jwt.sign(payload, secret, options, (err, token: any) => {
                if(err)
                    return reject(err)
                resolve(token)
            })
        })
    },
    verifyAccessToken: function(req: any, res: any, next: any){
        const accessToken = req.headers.cookie.split("accessToken=")[1];
        
        if(!accessToken)
            return next(createError.Unauthorized());

        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET || "", (err: any, payload: any) => {
            if(err){
                const message = err.name == "JsonWebTokenError" ?
                         "Unauthorized" : err.message;

                return next(createError.Unauthorized(message));
            }
            req.headers.userId = payload.aud;            
            next();
        })
    },
    verifyRefreshToken: function (refreshToken: string): Promise<string>{
        return new Promise((resolve, reject) => {
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET || "", (err, payload: any) => {
                if(err)
                    return reject(createError.Unauthorized());

                const userId = payload.aud;
                resolve(userId)
            })
        })
    }
}

export default authModule;
