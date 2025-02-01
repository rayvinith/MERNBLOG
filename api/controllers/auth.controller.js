import bcryptjs from 'bcryptjs';
import User from "../models/user.model.js";
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';
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


// this is the end of signup function


export const signin = async(req,res,next)=>{
const {email,password}=req.body;
if(!email || !password || email==='' || password===''){
  next(errorHandler(400,"All fields are required"))
}
try {
  const validUser=await User.findOne({email:email})
  if(!validUser){
return next(errorHandler(404,"User not Found"))
  }
  const validPassword=bcryptjs.compareSync(password,validUser.password)
  if(!validPassword){
    next(errorHandler(400,"Invalid credentials"))
  }
const token =jwt.sign({
  id:validUser._id
  
},
"Aniket",
// pata nhi process.env kam nhi krra process.env.JWT_SECRET so i hardcoed it 
)
const {password:pass,...rest}=validUser._doc;
res.status(200).cookie('acess_token',token,{
  httpOnly:true
}).json(rest)
} catch (error) {
  next(error)
}
}

// google signin controller

// export const google=async(req,res,next)=>{
// const {email,name,googlePhotoUrl}=req.body;
// try {
//   const user=await User.findOne({email})
//   if(user){
//     const token=jwt.sign({id:user._id},import.meta.env.JWT_SECRET)
//     const {password,...rest}=user._doc;
//     res.status(200).cookie('acess_token',token,{
//       httpOnly:true,
//     }).json(rest)
//   }
//   else{
//     const generatedPassword=Math.random().toString(36).slice(-8) + Math.random(36).slice(-8);
//     const hashedPassword=bcryptjs.hashSync(generatedPassword,10);
//     const newUser=new User({
//       username:name.toLowerCase().split(' ').join(' ')+Math.random().toString(36).slice(-4),
//       email,
//       profilePicture:googlePhotoUrl
//     })
//     await newUser.save();
//     const token=jwt.sign({id:newUser._id}, "Aniket")
//     const {password,...rest}=newUser._doc;
//     res.status(200).cookie('acess_token',token,{
//       httpOnly:true,
//     }).json(rest)
//   }
// } catch (error) {
//   next(error);
// }
// }

export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        "Aniket",
      );
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(' ').join('') +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        "Aniket"
      );
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};