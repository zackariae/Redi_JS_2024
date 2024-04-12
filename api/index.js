import express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

mongoose.
connect(process.env.MONGODB).
then(console.log("connected to MongoDb ")).
catch((error)=>console.log(error));


app.listen(3000,()=>{
    console.log("server Run on port 3000");
});

