import User from "../models/users.js";
import Chat from "../models/chats.js";

export const validateAccessChat = async(req,res,next) => {
    try {
        const {friendId, userId} = req.body;
        if(!friendId) return res.status(404).json({status: 404, success: false, message: "Friend Id is required."});
        if(!userId) return res.status(404).json({status: 404, success: false, message: "User Id is required."});

        const findExistingUser = await User.findById(userId).exec();
        if(!findExistingUser) return res.status(404).json({status: 404, success: false, message: "User not found."});

        const findExistingFriend = await User.findById(friendId).exec();
        if(!findExistingFriend) return res.status(404).json({status: 404, success: false, message: "Friend not found."});

        next();
    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}

export const validateFetchChats = async(req,res,next) => {
    try {
        const {userId} = req.body;
        if(!userId) return res.status(404).json({status: 404, success: false, message: "You are not logged in."});

        const findExistingUser = await User.findById(userId).exec();
        if(!findExistingUser) return res.status(404).json({status: 404, success: false, message: "User not found."});

        next();
    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}

export const validateFetchSingleChat = async(req,res,next) => {
    try {
        const { userId, chatId } = req.body;
        if(!userId) return res.status(404).json({status: 404, success: false, message: "User id is required."});
        if(!chatId) return res.status(404).json({status: 404, success: false, message: "Chat id is required."});

        const findExistingUser = await User.findById(userId).exec();
        if(!findExistingUser) return res.status(404).json({status: 404, success: false, message: "User not found."});

        const findExistingChat = await Chat.findById(chatId).exec();
        if(!findExistingChat) return res.status(404).json({status: 404, success: false, message: "Chat not found."});

        next();
    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}

export const validateCreateGroupChat  = async(req,res,next) => {
    try {
        const {friendsList, name, userId} = req.body;
        console.log(friendsList, name, userId);
        if(!friendsList) return res.status(404).json({status: 404, success: false, message: "Please select at least one friend."});
        if(!name) return res.status(404).json({status: 404, success: false, message: "Group name is required."});
        if(!userId) return res.status(404).json({status: 404, success: false, message: "You are not logged in."}); // current user that is logged in.

        let usersList = friendsList;
        if(usersList.length < 2) {
            return res.status(400).json({status: 400, success: false, message: "More than 2 users are required to form a group chat."});
        }

        const findExistingUser = await User.findById(userId).exec();
        if(!findExistingUser) return res.status(404).json({status: 404, success: false, message: "User not found."});

        usersList.push(userId); // group is being formed with the users added with the current user that is logged in.
        req.userslist = usersList;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({status: 500, success: false,  message: "Internal server error."});
    }
}

export const validateRenameGroup = async(req,res,next) => {
    try {
        const  {chatId, chatNameToBeChanged } = req.body;
        if(!chatId) return res.status(404).json({status: 404, success: false, message: "Please provide chat id."});
        if(!chatNameToBeChanged) return res.status(404).json({status: 404, success: false, message: "Chat name is required."});

        const findExistingChat = await Chat.findById(chatId).exec();
        if(!findExistingChat) return res.status(404).json({status: 404, success: false, message: "Chat not found."});

        next();
    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}

export const validateAddtoGroup = async(req,res,next) =>  {
    try {
        const {chatId, userId} = req.body;
        if(!chatId) return res.status(404).json({status: 404, success: false, message: "Please provide chat id"});
        if(!userId) return res.status(404).json({status: 404, success: false, message: "User id is required."});

        const findExistingChat = await Chat.findById(chatId).exec();
        if(!findExistingChat) return res.status(404).json({status: 404, success: false, message: "Chat not found."});
        if(!findExistingChat.isGroupChat) return res.status(404).json({status: 404, success: false, message: "Please find & select a group chat."});

        const findExistingUser = await User.findById(userId).exec();
        if(!findExistingUser) return res.status(404).json({status: 404, success: false, message: "User not found."});

        if(findExistingChat.isGroupChat){
            next();
        }
    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}

export const validateRemoveFromGroup = async(req,res,next) => {
    try {
        const {chatId, userId} = req.body;
        if(!chatId) return res.status(404).json({status: 404, success: false, message: "Please provide chat id"});
        if(!userId) return res.status(404).json({status: 404, success: false, message: "User id is required."});

        const findExistingChat = await Chat.findById(chatId).exec();
        if(!findExistingChat) return res.status(404).json({status: 404, success: false, message: "Chat not found."});
        if(!findExistingChat.isGroupChat) return res.status(404).json({status: 404, success: false, message: "Please find & select a group chat."});

        const findExistingUser = await User.findById(userId).exec();
        if(!findExistingUser) return res.status(404).json({status: 404, success: false, message: "User not found."});

        if(findExistingChat.isGroupChat){
            next();
        }
    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}