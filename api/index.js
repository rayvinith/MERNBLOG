import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.route.js';
const app = express();
app.use(express.json());
dotenv.config();
mongoose.connect("mongodb://localhost:27017/").then(
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