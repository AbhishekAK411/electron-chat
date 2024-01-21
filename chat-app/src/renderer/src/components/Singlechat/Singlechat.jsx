import { IconButton, Typography } from "@material-tailwind/react";
import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authContext } from "../../context/authContext";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:8000";
let socket, selectedChatCompare;

const Singlechat = ({ singleChatProps }) => {

    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [socketConnected, setSocketConnected] = useState(false);
    const { state } = useContext(authContext);

    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit("setup", state?.user?._id);
        socket.on("connected", () => setSocketConnected(true));
    }, [state?.user]);

    const fetchAllMessages = useCallback(async() => {
        try {
            const fetchAllMessagesRequest = await axios.post(`http://localhost:8000/app/message/${singleChatProps?._id}`, {
                userId: state?.user?._id
            });

            const fetchAllMessagesResponse = fetchAllMessagesRequest?.data;
            if(fetchAllMessagesResponse?.success){
                setMessages(fetchAllMessagesResponse?.allMessages);
                socket.emit('join chat', singleChatProps?._id);
            }
        } catch (error) {
            console.log(error);
        }
    }, [state?.user?._id, singleChatProps?._id]);

    const handleMessageChange = (e) => {
        const {value} = e.target;
        setNewMessage(value);
    }
    const handleClick = async() => {
        try {
            const sendMessageRequest = await axios.post("http://localhost:8000/app/send-message", {
                userId: state?.user?._id,
                content: newMessage,
                chatId: singleChatProps?._id,
            });

            const sendMessageResponse = sendMessageRequest?.data;
            if(sendMessageResponse?.success){
                setNewMessage("");
                socket.emit("new message", sendMessageResponse?.chatMsg);
                setMessages((prevMessage) => [...prevMessage, sendMessageResponse?.chatMsg]);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
        }
    }

    useEffect(() => {
        fetchAllMessages();

        selectedChatCompare = singleChatProps;
    }, [fetchAllMessages, singleChatProps]);

    useEffect(() => {
        socket.on("message received", (newMessageReceived) => {
            setMessages([...messages, newMessageReceived]);
        })
    })
    return (
        <>
            <div className="w-full h-full flex flex-col justify-between">
                <div className="w-full h-16 border-b border-slate-700"></div>
                <div className="w-full h-[calc(100%-64px)]">
                    <div className="w-full h-[88%] flex flex-col justify-end gap-2 px-5 py-2 overflow-hidden">
                        <div className="w-full h-full overflow-scroll no-scrollbar flex flex-col gap-2 px-5 py-2 items-end self-end">
                            {messages?.length > 0 ? (<>
                                {messages.map((message, i) => (
                                    <div key={i} className={`p-1 w-fit h-fit flex flex-col rounded-lg bg-slate-700 ${message.sender._id === state?.user?._id ? 'self-end items-end' : 'self-start items-start'}`}>
                                        <Typography className="text-[10px] text-blue-gray-900 font-black">{message?.sender?.username}</Typography>
                                        <Typography variant="lead" className="text-[12px] text-blue-gray-900">{message?.content}</Typography>
                                    </div>
                                ))}
                            </>) : (<>
                                <div className="w-full h-full flex items-center justify-center">
                                    <Typography variant="lead" className="text-3xl text-white">No recent chats.</Typography>
                                </div>
                            </>)}
                        </div>
                    </div>
                    <div className="w-full h-[12%] flex items-center justify-center px-5 relative">
                        <input onChange={handleMessageChange} type="text" placeholder="Type your message here..." className="rounded-full ml-3 input bg-slate-700 w-full max-w-full h-[40px] focus:outline-none focus:border-none" />
                        <IconButton onClick={handleClick} className="absolute right-9 flex items-center justify-center rounded-full bg-slate-700">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fcfcfc" viewBox="0 0 256 256"><path d="M222.88,115.69l-168-95.88a14,14,0,0,0-20,16.85l31,90.48,0,.07a2.11,2.11,0,0,1,0,1.42l-31,90.64A14,14,0,0,0,48,238a14.11,14.11,0,0,0,6.92-1.83L222.84,140.1a14,14,0,0,0,0-24.41Zm-5.95,14L49,225.73a1.87,1.87,0,0,1-2.27-.22,1.92,1.92,0,0,1-.56-2.28L76.7,134H136a6,6,0,0,0,0-12H76.78L46.14,32.7A2,2,0,0,1,49,30.25l168,95.89a1.93,1.93,0,0,1,1,1.74A2,2,0,0,1,216.93,129.66Z"></path></svg>
                        </IconButton>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Singlechat;