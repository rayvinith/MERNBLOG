import jwt from "jsonwebtoken";

import {errorHandler} from "./error.js"

export const verifyToken=(req,res,next)=>{
    const token =req.cookies.acess_token;

if(!token){
    return next(errorHandler(401,"Unauthoised"))
}
jwt.verify(token,"Aniket",(err,user)=>{
    if(err){
        return next(errorHandler(403,"Token is not valid"))
    }
    req.user=user;
    
    next();
});
};
