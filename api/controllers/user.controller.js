import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
export const test=(req,res)=>{
   res.json({message:"api is working"})
}

export const updateUser=async(req,res,next)=>{
console.log(req.user);

if(req.user.id !== req.params.userId){
   return next(errorHandler(403,"You are not allowed to update this user"))
}
if(req.body.password){
   if(req.body.password.length<6){
       return next(errorHandler(400,"Password should be atleast 6 characters"))

   }
   req.body.password=bcryptjs.hashSync(req.body.password,10)
}
if(req.body.username){
   if(req.body.username.length<7 || req.body.username.length>20){
       return next(errorHandler(400,"Username should be between 7 and 20 characters"))

   }
}
if (req.body.username.includes(' ')) {
   return next(errorHandler(400, 'Username cannot contain spaces'));
 }
 if (req.body.username !== req.body.username.toLowerCase()) {
   return next(errorHandler(400, 'Username must be lowercase'));
 }
 if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
   return next(
     errorHandler(400, 'Username can only contain letters and numbers')
   );
 }

try {
const updatedUser=await User.findByIdAndUpdate(req.params.userId,{
   $set:{
         username:req.body.username,
         email:req.body.email,
         password:req.body.password,
   }
},
{new:true}) 
const {password,...rest}=updatedUser._doc;
console.log("rest",rest);

res.status(200).json(rest)  
} catch (error) {
   next(error)
}


}



// deleteUser functionality
export const deleteUser=async(req,res,next)=>{
console.log(req.user);

// from where this req.user is coming from ,ocal storage ?  or from the token


if(req.user.id != req.params.userId){
   return next(errorHandler(403,"You are not allowed to delete this user"))

}
try {

   await User.findByIdAndDelete(req.params.userId);
   res.status(200).json({message:"User deleted Successfully"})

} catch (error) {
   next(error)
}

}