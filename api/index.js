import express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';

dotenv.config();
const app = express();

mongoose.
connect(process.env.MONGODB).
then(console.log("connected to MongoDb ")).
catch((error)=>console.log(error));


app.listen(3000,(res,req)=>{
    console.log("server is Running on port 3000");
});

//allow the backend to receive json data
app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/auth',authRoutes);
//Error handling middleware
app.use((err, req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({success: false,statusCode,message});
});
