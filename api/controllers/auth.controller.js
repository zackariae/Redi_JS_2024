import User from "../models/user.model.js"
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";



export const signup =async (req, res, next)=>{
    const {userName, email, password} = req.body;

    if(!userName || !email || !password || userName==='' || email==='' || password===''){
        next(errorHandler(400,'All field are required !'));
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({userName, email, password:hashedPassword});

    try {
        await newUser.save();
        res.json("new User created successfully");
    } catch (error) {
        next(error);
    }
    

}

export const signin =async (req, res, next)=>{
    const {email, password} = req.body;

    if(!email || !password || email==='' || password===''){
        next(errorHandler(400,'All field are required !'));
    }
 

    try {
        const validUser = await User.findOne({email});
        if(!validUser){
            return next(errorHandler(401,"email or password is not correct"));
        }


        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword){
            return next(errorHandler(401,"email or password is not correct"));
        }

        const token = jwt.sign(
            {id:validUser._id},process.env.JWT_SECRET,
        );

        const {password:pass, ...rest} = validUser._doc;
        res.status(200).cookie('access_token',token, {
            httpOnly:true,
        })
        .json(rest);

      
    } catch (error) {
        next(error);
    }
    

}

export const google = async (req, res , next)=>{
    const {email, name, googlePhotoUrl} = req.body;
    try {
        const user = await User.findOne({email});
        if(user){
            const token = jwt.sign({id:user._id}, process.env.JWT_SECRET);
            const {password, ...rest} = user._doc;
            res.status(200).cookie('access_token', token, {
                httpOnly: true,
            }).json(rest);
        }else{
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword,10);
            const newUser = new User({
                userName: name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
                email: email,
                password: hashedPassword,
                profilePicture: googlePhotoUrl,
            });
            await newUser.save();
            const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET);
            const {password, ...rest} = newUser._doc;
            res.status(200).cookie('access_token', token, {
                httpOnly: true,
            }).json(rest);
        }

    } catch (error) {
        next("google ",error);
    }

}