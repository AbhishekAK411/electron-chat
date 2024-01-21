import Chat from "../models/chats.js";
import User from "../models/users.js";

export const accessChat = async(req,res) => {
    try {
        const { friendId, userId } = req.body;

        
        let isChat = await Chat.find({
            isGroupChat: false,
            $and: [
                {users: {$elemMatch: {$eq: friendId}}},
                {users: {$elemMatch: {$eq: userId}}},
            ]
        }).populate("users", "-password").populate("latestMessage")

        isChat = await User.populate(isChat, {
            path:'latestMessage.sender',
            select: 'username email'
        });

        if(isChat.length > 0){
            return res.status(200).json({status: 200, success: true, data: isChat});
        }else {
            let chatData = {
                chatName: "sender", //! change chatname here
                isGroupChat: false,
                users: [friendId, userId]
            }

            try {
                const createdChat = await Chat.create(chatData);

                const fullChat = await Chat.findOne({_id: createdChat._id}).populate("users", "-password").exec();
                return res.status(201).json({status: 201, success: true, data: fullChat});
            } catch (error) {
                return res.status(400).json({status: 400, success: false, message: error.message});
            }
        }
    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}

export const fetchChats = async(req,res) => {
    try {
        const {userId} = req.body;

        const fetchChats = await Chat.find({users: {$elemMatch: {$eq: userId}}})
        .populate("users", "-password")
        .populate("groupAdmin", "-password")
        .populate("latestMessage")
        .sort({updatedAt: -1});

        const finalChats = await User.populate(fetchChats, {
            path: "latestMessage.sender",
            select: "name email"
        });

        if(fetchChats.length > 0){
            return res.status(200).json({status: 200, success: true, data: finalChats});
        }else{
            return res.status(200).json({status: 200, success: true, message: "No chats found."});
        }
    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}

export const fetchSingleChat = async(req,res) => {
    try {
        const {userId, chatId} = req.body;
        
        const findExistingUser = await User.findById(userId).exec();
        if(!findExistingUser) return res.status(404).json({status: 404, success: false, message: "User not found."});

        const findSingleChat = await Chat.findOne({
            _id: chatId,
            users: {$elemMatch: {$eq: userId}}
        })
        .populate("users", "-password")
        .populate("groupAdmin", "-password")
        .populate("latestMessage")
        .sort({updatedAt: -1});
        if(!findSingleChat) return res.status(404).json({status: 404, success: false, message: "Chat not found."});

        const fetchSingleChat = await User.populate(findSingleChat, {
            path: 'latestMessage.sender',
            select: 'name email'
        });

        if(fetchSingleChat){
            return res.status(200).json({status: 200, success: true, data: fetchSingleChat});
        }
    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
} 

export const createGroupChat = async(req,res) => {
    try {
        const {name, userId} = req.body;
        const userList = req.userslist;

        const findExistingUser = await User.findById(userId).exec();
        if(!findExistingUser) return res.status(404).json({status: 404, success: false, message: "User not found."});

        const groupChat = await Chat.create({
            chatName: name,
            users: userList,
            isGroupChat: true,
            groupAdmin: findExistingUser._id
        });

        const fullChat = await Chat.findOne({_id: groupChat._id})
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

        return res.status(200).json({status: 200, success: true, message: "Group chat created.", data: fullChat});
    } catch (error) {
        console.log(error);
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}

export const renameGroup = async(req,res) => {
    try {
        const {chatId, chatNameToBeChanged} = req.body;
        
        const updatedChat = await Chat.findByIdAndUpdate(chatId, {
            chatName: chatNameToBeChanged
        }, {new: true})
        .populate("users", "-password")
        .populate("groupAdmin", "-password")
        .exec();

        if(updatedChat){
            return res.status(200).json({status: 200, success: true, message: "Updated chat successfully.", data: updatedChat});
        }else{
            return res.status(400).json({status: 400, success: false, message: "Error updating chat details. Please try again later."});
        }
    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}

export const addToGroup = async(req,res) => {
    try {
        const { chatId, userId } = req.body;

        const findUserInGroup = await Chat.findById(chatId).exec();

        if(findUserInGroup.users.includes(userId)){
            return res.status(400).json({status: 400, success: false, message: "User is already in the group."});
        }
        const addToChat = await Chat.findByIdAndUpdate(chatId, {
            $push: {users: userId}
        }, {new: true}).populate("users", "-password").populate("groupAdmin", "-password").exec();

        if(addToChat){
            return res.status(200).json({status: 200, success: true, message: "Added to group successfully.", data: addToChat});
        }else{
            return res.status(400).json({status: 400, success: false, message: "Could not add user to the group."});
        }
    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}

export const removeFromGroup = async(req,res) => {
    try {
        const { chatId, userId } = req.body;

        const findUserInGroup = await Chat.findById(chatId).exec();

        if(!findUserInGroup.chats.includes(chatId)){
            return res.status(400).json({status: 400, success: false, message: "User does not exist in the group."});
        }
        const addToChat = await Chat.findByIdAndUpdate(chatId, {
            $pull: {users: userId}
        }, {new: true}).populate("users", "-password").populate("groupAdmin", "-password").exec();

        if(addToChat){
            return res.status(200).json({status: 200, success: true, message: "Removed user successfully.", data: addToChat});
        }else{
            return res.status(400).json({status: 400, success: false, message: "Could not remove user from the group."});
        }
    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}



