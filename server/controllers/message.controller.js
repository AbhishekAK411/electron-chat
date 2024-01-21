import Message from "../models/messages.js";
import User from "../models/users.js";
import Chat from "../models/chats.js";

export const sendMessage = async(req,res) => {
    try {
        const {userId, content, chatId} = req.body;

        let newMessage = {
            sender: userId,
            content: content,
            chat: chatId
        };

        let message = await (await (await Message.create(newMessage)).populate("sender", "username email")).populate({
            path: "chat",
            populate: {
                path: "users",
                select: "username email"
            }
        });

        await Chat.findByIdAndUpdate(chatId, {
            latestMessage: message,
        }).exec();

        return res.status(200).json({status: 200, success: true, chatMsg: message});
    } catch (error) {
        console.log(error);
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}

export const allMessages = async(req,res) => {
    try {
        const chatId = req.params.chatId;

        const messages = await Message.find({chat: chatId}).populate(
            "sender",
            "username email"
        ).populate(
            "chat"
        );

        if(messages.length > 0){
            return res.status(200).json({status: 200, success: true, allMessages: messages});
        }else{
            return res.status(200).json({status: 200, success: true, allMessages: []});
        }
    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}