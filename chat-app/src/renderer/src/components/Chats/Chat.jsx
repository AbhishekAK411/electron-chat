import { IconButton, Typography } from "@material-tailwind/react";

const Chat = ({ chatProps, handleSingleChat }) => {


    return (
        <>
            {chatProps ? (<>
                <div className="w-full h-full flex items-center gap-2 py-5">
                    <div className="w-[90%] h-full overflow-scroll no-scrollbar m-auto">
                        {chatProps.map((chat, i) => (
                            <div onClick={() => handleSingleChat(chat._id)} key={i} className="w-full h-12 rounded-lg hover:bg-white/20 flex items-center gap-2 px-2 cursor-pointer select-none">
                                <div className="flex w-full h-full items-center justify-between">
                                    <Typography variant="small" className="uppercase">
                                        {chat.chatName}
                                    </Typography>
                                    <IconButton className="flex items-center justify-center scale-[0.8] bg-slate-700 rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fcfcfc" viewBox="0 0 256 256"><path d="M216,50H40A14,14,0,0,0,26,64V224a13.88,13.88,0,0,0,8.09,12.69A14.11,14.11,0,0,0,40,238a13.87,13.87,0,0,0,9-3.31l.09-.08,32.14-28.17A2,2,0,0,1,82.5,206H216a14,14,0,0,0,14-14V64A14,14,0,0,0,216,50Zm2,142a2,2,0,0,1-2,2H82.5a14,14,0,0,0-9,3.29l-.09.08L41.25,225.54A2,2,0,0,1,38,224V64a2,2,0,0,1,2-2H216a2,2,0,0,1,2,2Zm-52-80a6,6,0,0,1-6,6H96a6,6,0,0,1,0-12h64A6,6,0,0,1,166,112Zm0,32a6,6,0,0,1-6,6H96a6,6,0,0,1,0-12h64A6,6,0,0,1,166,144Z"></path></svg>
                                    </IconButton>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </>) : (<>
                <div className="w-full h-full flex items-center justify-center select-none">
                    <Typography variant="small">No Chats Found.</Typography>
                </div>
            </>)}
        </>
    )
}

export default Chat;