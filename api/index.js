import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.route.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();
app.use(express.json());
//how to use cors

app.use(cookieParser());

app.use(cors());

dotenv.config();
mongoose.connect("mongodb+srv://rayaniket6404:QjYc5yUrn0VTyYMA@cluster0.7pfba.mongodb.net/MERNBLOG").then(
    ()=>{
        console.log('MongoDB Connected...');
    }
).catch((err)=>{
    console.log(err);
});
app.listen(3000,()=>{
    console.log('Server running on port 3000');
})

// test route 

app.use('/api/user',userRoutes)
// but certainly thats not possible to caret every route over here becayse it will be length so we will have separate routes foldeer 

app.use('/api/auth',authRoutes) 

// middleware
app.use((err,req,res,next)=>{
const statusCode=err.statusCode||500;
const message = err.message || 'Internal Server Error';

res.status(statusCode).json({
   success:false,
   statusCode,
   message,
});
});