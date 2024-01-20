import { IconButton, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Inbox from "../Inbox/Inbox";
import Chat from "../Chats/Chat";
import Archive from "../Archive/Archive";
import Schedule from "../Schedule/Schedule";
import Settings from "../Settings/Settings";

const Home = () => {

    const [sidebarToggle, setSidebarToggle] = useState(false);
    const [activeTab, setActiveTab] = useState("");

    const handleOnOpen = () => {
        setSidebarToggle(true);
    }
    const handleOnClose = () => {
        setSidebarToggle(false);
    }
    const handleInboxState = () => {
        handleOnOpen();
        setActiveTab("Inbox");
    }
    const handleChatState = () => {
        handleOnOpen();
        setActiveTab("Chat");
    }
    const handleArchivedState = () => {
        handleOnOpen();
        setActiveTab("Archive");
    }
    const handleScheduleState = () => {
        handleOnOpen();
        setActiveTab("Schedule");
    }
    const handleSettingState = () => {
        handleOnOpen();
        setActiveTab("Settings")
    }

    const transitions = {
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 0.5,
    }

    return (
        <>
            <main className="w-full h-screen flex items-center justify-center">
                <div className="w-[98%] h-[95%] flex justify-between">
                    <div className={`${sidebarToggle ? 'w-[40%]' : 'w-[16%]' } h-full flex items-center justify-between`}>
                        <div className={`${sidebarToggle ? 'w-[40%]' : 'w-full'} h-full rounded-lg bg-slate-800`}>
                            <div className="w-full h-16 border-b border-slate-700 flex">
                                <div className="w-2/3 h-full flex flex-col justify-center px-3 select-none">
                                    <Typography className="text-sm">Inbox</Typography>
                                    <Typography className="text-sm">email</Typography>
                                </div>
                                <div className="w-1/3 h-full flex items-center justify-center">
                                    <IconButton className="scale-[0.8] bg-amber-500 flex items-center justify-center w-10 h-10 rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#000" viewBox="0 0 256 256"><path d="M110,216a6,6,0,0,1-6,6H48a14,14,0,0,1-14-14V48A14,14,0,0,1,48,34h56a6,6,0,0,1,0,12H48a2,2,0,0,0-2,2V208a2,2,0,0,0,2,2h56A6,6,0,0,1,110,216Zm110.24-92.24-40-40a6,6,0,0,0-8.48,8.48L201.51,122H104a6,6,0,0,0,0,12h97.51l-29.75,29.76a6,6,0,1,0,8.48,8.48l40-40A6,6,0,0,0,220.24,123.76Z"></path></svg>
                                    </IconButton>
                                </div>
                            </div>
                            <div className="w-full h-80 border-b border-slate-700 flex flex-col items-center gap-2 py-5">
                                <div onClick={handleInboxState} className="w-[90%] h-12 rounded-lg hover:bg-white/20 flex items-center gap-2 px-2 cursor-pointer select-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fcfcfc" viewBox="0 0 256 256"><path d="M208,34H48A14,14,0,0,0,34,48V208a14,14,0,0,0,14,14H208a14,14,0,0,0,14-14V48A14,14,0,0,0,208,34ZM48,46H208a2,2,0,0,1,2,2V154H179.31a13.94,13.94,0,0,0-9.9,4.1L150.1,177.41a2,2,0,0,1-1.41.59H107.31a2,2,0,0,1-1.41-.58L86.59,158.1a13.94,13.94,0,0,0-9.9-4.1H46V48A2,2,0,0,1,48,46ZM208,210H48a2,2,0,0,1-2-2V166H76.69a2,2,0,0,1,1.41.58L97.41,185.9a13.94,13.94,0,0,0,9.9,4.1h41.38a13.94,13.94,0,0,0,9.9-4.1l19.31-19.31a2,2,0,0,1,1.41-.59H210v42A2,2,0,0,1,208,210Z"></path></svg>
                                    <Typography variant="small" className="font-extralight">Inbox</Typography>
                                </div>
                                <div onClick={handleChatState} className="w-[90%] h-12 rounded-lg hover:bg-white/20 flex items-center gap-2 px-2 cursor-pointer select-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fcfcfc" viewBox="0 0 256 256"><path d="M168.16,74.42A78,78,0,0,0,18,104v66a12,12,0,0,0,12,12H88a78.15,78.15,0,0,0,72,48h66a12,12,0,0,0,12-12V152A78,78,0,0,0,168.16,74.42ZM30,104a66,66,0,1,1,66,66H30ZM226,218H160a66.13,66.13,0,0,1-58.89-36.19,77.92,77.92,0,0,0,71-94.68A66,66,0,0,1,226,152Z"></path></svg>
                                    <Typography variant="small">Chats</Typography>
                                </div>
                                <div onClick={handleArchivedState} className="w-[90%] h-12 rounded-lg hover:bg-white/20 flex items-center gap-2 px-2 cursor-pointer select-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fcfcfc" viewBox="0 0 256 256"><path d="M224,50H32A14,14,0,0,0,18,64V88a14,14,0,0,0,14,14h2v90a14,14,0,0,0,14,14H208a14,14,0,0,0,14-14V102h2a14,14,0,0,0,14-14V64A14,14,0,0,0,224,50ZM210,192a2,2,0,0,1-2,2H48a2,2,0,0,1-2-2V102H210ZM226,88a2,2,0,0,1-2,2H32a2,2,0,0,1-2-2V64a2,2,0,0,1,2-2H224a2,2,0,0,1,2,2ZM98,136a6,6,0,0,1,6-6h48a6,6,0,0,1,0,12H104A6,6,0,0,1,98,136Z"></path></svg>
                                    <Typography variant="small">Archived</Typography>
                                </div>
                                <div onClick={handleScheduleState} className="w-[90%] h-12 rounded-lg hover:bg-white/20 flex items-center gap-2 px-2 cursor-pointer select-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fcfcfc" viewBox="0 0 256 256"><path d="M208,34H182V24a6,6,0,0,0-12,0V34H86V24a6,6,0,0,0-12,0V34H48A14,14,0,0,0,34,48V208a14,14,0,0,0,14,14H208a14,14,0,0,0,14-14V48A14,14,0,0,0,208,34ZM48,46H74V56a6,6,0,0,0,12,0V46h84V56a6,6,0,0,0,12,0V46h26a2,2,0,0,1,2,2V82H46V48A2,2,0,0,1,48,46ZM208,210H48a2,2,0,0,1-2-2V94H210V208A2,2,0,0,1,208,210Zm-98-90v64a6,6,0,0,1-12,0V129.71l-7.32,3.66a6,6,0,1,1-5.36-10.74l16-8A6,6,0,0,1,110,120Zm59.57,29.25L148,178h20a6,6,0,0,1,0,12H136a6,6,0,0,1-4.8-9.6L160,142a10,10,0,1,0-16.65-11A6,6,0,1,1,133,125a22,22,0,1,1,36.62,24.26Z"></path></svg>
                                    <Typography variant="small">Schedule</Typography>
                                </div>
                                <div onClick={handleSettingState} className="w-[90%] h-12 rounded-lg hover:bg-white/20 flex items-center gap-2 px-2 cursor-pointer select-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fcfcfc" viewBox="0 0 256 256"><path d="M128,82a46,46,0,1,0,46,46A46.06,46.06,0,0,0,128,82Zm0,80a34,34,0,1,1,34-34A34,34,0,0,1,128,162Zm108-54.4a6,6,0,0,0-2.92-4L202.64,86.22l-.42-.71L202.1,51.2A6,6,0,0,0,200,46.64a110.12,110.12,0,0,0-36.07-20.31,6,6,0,0,0-4.84.45L128.46,43.86h-1L96.91,26.76a6,6,0,0,0-4.86-.44A109.92,109.92,0,0,0,56,46.68a6,6,0,0,0-2.12,4.55l-.16,34.34c-.14.23-.28.47-.41.71L22.91,103.57A6,6,0,0,0,20,107.62a104.81,104.81,0,0,0,0,40.78,6,6,0,0,0,2.92,4l30.42,17.33.42.71.12,34.31A6,6,0,0,0,56,209.36a110.12,110.12,0,0,0,36.07,20.31,6,6,0,0,0,4.84-.45l30.61-17.08h1l30.56,17.1A6.09,6.09,0,0,0,162,230a5.83,5.83,0,0,0,1.93-.32,109.92,109.92,0,0,0,36-20.36,6,6,0,0,0,2.12-4.55l.16-34.34c.14-.23.28-.47.41-.71l30.42-17.29a6,6,0,0,0,2.92-4.05A104.81,104.81,0,0,0,236,107.6Zm-11.25,35.79L195.32,160.1a6.07,6.07,0,0,0-2.28,2.3c-.59,1-1.21,2.11-1.86,3.14a6,6,0,0,0-.91,3.16l-.16,33.21a98.15,98.15,0,0,1-27.52,15.53L133,200.88a6,6,0,0,0-2.93-.77h-.14c-1.24,0-2.5,0-3.74,0a6,6,0,0,0-3.07.76L93.45,217.43a98,98,0,0,1-27.56-15.49l-.12-33.17a6,6,0,0,0-.91-3.16c-.64-1-1.27-2.08-1.86-3.14a6,6,0,0,0-2.27-2.3L31.3,143.4a93,93,0,0,1,0-30.79L60.68,95.9A6.07,6.07,0,0,0,63,93.6c.59-1,1.21-2.11,1.86-3.14a6,6,0,0,0,.91-3.16l.16-33.21A98.15,98.15,0,0,1,93.41,38.56L123,55.12a5.81,5.81,0,0,0,3.07.76c1.24,0,2.5,0,3.74,0a6,6,0,0,0,3.07-.76l29.65-16.56a98,98,0,0,1,27.56,15.49l.12,33.17a6,6,0,0,0,.91,3.16c.64,1,1.27,2.08,1.86,3.14a6,6,0,0,0,2.27,2.3L224.7,112.6A93,93,0,0,1,224.73,143.39Z"></path></svg>
                                    <Typography variant="small">Settings</Typography>
                                </div>
                            </div>
                        </div>
                        {sidebarToggle && <>
                            <AnimatePresence>
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={transitions} className="w-[59%] h-full rounded-lg bg-slate-800 relative">
                                    <div className="absolute right-2 top-2">
                                        <IconButton onClick={handleOnClose} className="flex items-center justify-center rounded-full scale-[0.7] bg-amber-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#000" viewBox="0 0 256 256"><path d="M204.24,195.76a6,6,0,1,1-8.48,8.48L128,136.49,60.24,204.24a6,6,0,0,1-8.48-8.48L119.51,128,51.76,60.24a6,6,0,0,1,8.48-8.48L128,119.51l67.76-67.75a6,6,0,0,1,8.48,8.48L136.49,128Z"></path></svg>
                                        </IconButton>
                                    </div>
                                    <div className="relative top-16 w-full h-96 border-slate-700 border-b">
                                        {activeTab === "Inbox" && <Inbox />}
                                        {activeTab === "Chat" && <Chat />}
                                        {activeTab === "Archive" && <Archive />}
                                        {activeTab === "Schedule" && <Schedule />}
                                        {activeTab === "Settings" && <Settings />}
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </>}
                    </div>
                    <div className={`${sidebarToggle ? 'w-[59.5%]': 'w-[83.5%]'} h-full rounded-lg bg-slate-800`}>
                        
                    </div>
                </div>
            </main>
        </>
    )
}

export default Home;