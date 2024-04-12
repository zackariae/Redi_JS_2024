import mongoose from "mongoose";
//create tha table and set column 
const userSchema = mongoose.Schema({
    userName:{
        type: String,
        required: true,
        unique:true,
    },
    email:{
        type: String,
        required: true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
},
{timestamp:true}
);

const User = mongoose.model("User",userSchema);

export default User;