import User from "../models/users.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const register = async(req, res) => {
    try {
        const {username, email, password} = req.body;
        
        const findExistingUser = await User.findOne({$or: [{username: username}, {email: email}]}).exec();
        if(findExistingUser) return res.status(409).json({status: 409, success: false, message: "You are already registered."});

        const hashedPassword =await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();
        return res.status(201).json({status: 201, success: true, message: "You have registered successfully."});
    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}

export const login = async(req,res) => {
    try {
        const {email} = req.body;
        const findExistingUser = await User.findOne({email}).select("-password").exec();
        if(!findExistingUser) return res.status(409).json({status: 409, success: false, message: "User not found."});

        const payload = {id: findExistingUser._id};
        const token = jwt.sign(payload, process.env.jwtsecret);
        return res.status(200).json({status: 200, success: true, message: "logged in successfully.", token, payload: findExistingUser})
    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}

export const getCurrentUser = async(req,res) => {
    try {
        const {token} = req.body;
        const decodeToken = jwt.verify(token, process.env.jwtsecret);

        const userId = decodeToken.id;

        const findLoggedInUser = await User.findById(userId).select("-password").exec();
        if(findLoggedInUser){
            return res.status(200).json({status: 200, success: true, payload: findLoggedInUser});
        }
    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}

export const searchUser = async(req,res) => {
    try {
        
        const keyword = req.query.search ? {
            $or: [
                {username: {$regex: req.query.search, $options: "i"}},
                {email: {$regex: req.query.search, $options: "i"}}
            ]
        }
        : {};

        const searchedUsers = await User.find(keyword).select("-password").exec(); // pass jwt here-> find({_id: {$ne: req.user._id}})
        
        return res.status(200).json({status: 200, success: true, searchResults: searchedUsers});
    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}