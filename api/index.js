import express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';

dotenv.config();
const app = express();

mongoose.
connect(process.env.MONGODB).
then(console.log("connected to MongoDb ")).
catch((error)=>console.log(error));


app.listen(3000,(res,req)=>{
    console.log("server is Running on port 3000");
});

app.use('/api/user', userRoutes);

