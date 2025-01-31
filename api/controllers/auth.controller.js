import bcryptjs from 'bcryptjs';
import User from "../models/user.model.js";
import { errorHandler } from '../utils/error.js';

export const signup = async (req,res,next) => {
    console.log(req.body);
    // dekho req.body se sara detail jo hum log server ko bhej re hain wo mil jata hain 

    // so hum log ko yaha pe name , email , password bhejna tha server ko json form me aur re.body hum log ko deta de diya kuch aise 
    // {
    //     username: 'aniket',
    //     email: 'aniket@gmail.com',
    //     password: 'aniket@12345'
    //   }

    //basically object ke form me an hum log yaha se data churayenge 

    // const name = req.body.username
    // console.log(name);
    // //similarly email password bhi chura lo 
    // const email = req.body.email
    // console.log(email);
    // const password = req.body.password
    // console.log(password);

    // thk maja aaya ab ye lengthy process hogya isko ek bar me kaise le 

    const {username,email,password}=req.body
    console.log(username,email,password);

    // check before consoling that if there is a ausername,email,password it will increas ethe efficiency 
    if(!username || !email || !password || username==" " || email==" " ||password==" ")
    {
// return res.status(400).json({
//     message:"All fields are required "
// })
// ab error code nhi likhna hoga 
next(errorHandler(400,"All fields are required"))
    }
    
  const hashedPassword=bcryptjs.hashSync(password,10);

  // craete the user now   
  const newUser=new User  ({
    username,
    email,
    password:hashedPassword
  })
    
try {
  //lets now save the user in the database 
await newUser.save();
res.json({message:"Success"})  
} catch (error) {
  //  res.status(500).json({message:error.message}) 
  // iske jagah middleware call kro 
  next(error)
//    dekho ek hi data ko bar bar save krega to mongodb ur ke laat marega 
}


    
}