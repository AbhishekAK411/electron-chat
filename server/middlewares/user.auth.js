import User from "../models/users.js";
import bcrypt from "bcrypt";

export const validateRegister = async(req,res,next) => {
    try {
        const {username, email, password, confirmPassword} = req.body;
        if(!username || !email || !password || !confirmPassword) return res.status(404).json({status: 404, success: false, message: "All fields are required."});

        if(password !== confirmPassword) return res.status(401).json({status: 401, success: false, message: "Passwords do not match."});
        
        next();
    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}

export const validateLogin = async(req,res,next) => {
    try {
        const {email, password} = req.body;
        if(!email) return res.status(404).json({status: 404, success: false, message: "Email is required."});
        if(!password) return res.status(404).json({status: 404, success: false, message: "Password is required."});

        const existingUser = await User.findOne({email}).exec();
        if(!existingUser) return res.status(409).json({status: 409, success: false, message: "You are not registered."});

        const boolForPassword =await bcrypt.compare(password, existingUser.password);
        
        if(boolForPassword){
            next();
        }else{
            return res.status(409).json({status: 409, success: false, message: "Invalid credentials."});
        }
    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}