import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRoutes from './routes/user.routes.js';
const app = express();

dotenv.config();
mongoose.connect(process.env.MONGO_URI).then(
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