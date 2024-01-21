import Chat from "../models/chats.js";
import User from "../models/users.js";

export const validateSendMessage = async(req,res,next) => {
    try {
        const {userId, content, chatId} = req.body;
        if(!userId) return res.status(404).json({status: 404, success: false, message: "User id is required."});
        if(!content) return res.status(404).json({status: 404, success: false, message: "type something in the chat."});
        if(!chatId) return res.status(404).json({status: 404, success: false, message: "Chat id is required."});

        const findExistingUser = await User.findById(userId).exec();
        if(!findExistingUser) return res.status(404).json({status: 404, success: false, message: "User not found."});

        const findExistingChat = await Chat.findById(chatId).exec();
        if(!findExistingChat) return res.status(404).json({status: 404, success: false, message: "Chat not found."});

        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}

export const validateGetMessages = async(req,res,next) => {
    try {
        const chatId = req.params.chatId;
        const {userId} = req.body;
        if(!chatId) return res.status(404).json({status: 404, success: false, message: "Chat id is required."});
        if(!userId) return res.status(404).json({status: 404, success: false, message: "User id is required."});

        const findExistingUser = await User.findById(userId).exec();
        if(!findExistingUser) return res.status(404).json({status: 404, success: false, message: "User not found."});

        const findExistingChat = await Chat.findById(chatId).exec();
        if(!findExistingChat) return res.status(404).json({status: 404, success: false, message: "Chat not found."});

        next();
    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}