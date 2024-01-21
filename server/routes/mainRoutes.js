import express from "express";
import { validateLogin, validateRegister } from "../middlewares/user.auth.js";
import { getCurrentUser, login, register, searchUser } from "../controllers/user.controller.js";
import { validateAccessChat, validateAddtoGroup, validateCreateGroupChat, validateFetchChats, validateFetchSingleChat, validateRemoveFromGroup, validateRenameGroup } from "../middlewares/chat.auth.js";
import { accessChat, addToGroup, createGroupChat, fetchChats, fetchSingleChat, removeFromGroup, renameGroup } from "../controllers/chat.controller.js";
import { validateGetMessages, validateSendMessage } from "../middlewares/message.auth.js";
import { allMessages, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

//* User routes
router.post("/register", validateRegister, register); //! register API
router.post("/login", validateLogin, login); //! login API
router.post("/getCurrentUser", getCurrentUser); //! get current user logged in
router.get("/users", searchUser); //! search users API


//* Chat routes
router.post("/create-chat", validateAccessChat, accessChat); //! create chats API
router.post("/fetch-chats", validateFetchChats, fetchChats); //! fetch chats API
router.post("/fetch-single-chat", validateFetchSingleChat, fetchSingleChat); //! fetch single chat
router.post("/create-group-chat", validateCreateGroupChat, createGroupChat); //! create group chat API
router.put("/update-group-chat", validateRenameGroup, renameGroup); //!! rename group chat API
router.put("/add-to-group", validateAddtoGroup, addToGroup); //! add user to group API
router.put("/remove-from-group", validateRemoveFromGroup, removeFromGroup); //! remove user from group API

//* Message routes
router.post("/send-message", validateSendMessage, sendMessage); //! send message to user/group API
router.post("/message/:chatId", validateGetMessages, allMessages); //! get all messages based on chatId API!

export default router;