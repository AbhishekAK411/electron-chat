import express from "express";
import cors from "cors";
import morgan from "morgan";
import http from "http";
import {Server} from "socket.io";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./routes/mainRoutes.js";


const app = express();
dotenv.config();
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: false
}));
app.use("/app", router);

const server = http.createServer(app);
const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:5173",
    },
    
});

mongoose.connect(process.env.mongo)
.then(() => console.log("DB connection established."))
.catch((err) => console.log("DB Error =>", err));

server.listen(process.env.port, () => console.log(`Listening on port ${process.env.port}`));

io.on('connection', (socket) => {
    console.log('Connected to socket.io.');

    socket.on('setup', (userId) => {
        socket.join(userId);
        socket.emit('connected');
    });

    socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User joined room: " + room);
    });

    socket.on("new message", (newMessageReceived) => {
        let chat = newMessageReceived.chat;

        if(!chat.users) return console.log('chat.users is not defined.');

        chat.users.forEach((user) => {  
            if(user._id == newMessageReceived.sender._id) return;

            socket.in(user._id).emit("message received", newMessageReceived);
        });
    });

    socket.off("setup", () => {
        console.log("user disconnected.");
        socket.leave(userData._id);
    })
});

