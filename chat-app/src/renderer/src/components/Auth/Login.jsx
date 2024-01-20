import { useContext, useState } from "react"
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { authContext } from "../../context/authContext";

const Login = () => {

    const [userdata, setUserData] = useState({
        email: "",
        password: "",
    });
    const router = useNavigate();
    const { state, login } = useContext(authContext);

    if(state?.user){
        router("/home");
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const loginRequest = await axios.post("http://localhost:8000/app/login", {
                email: userdata?.email,
                password: userdata?.password
            });

            const loginResponse = loginRequest.data;
            if(loginResponse?.success){
                login({token: loginResponse.token, payload: loginResponse.payload});
                toast.success(loginResponse?.message);
                router("/home");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }

    const handleChange = (e) => {
        setUserData({...userdata, [e.target.name]: e.target.value});
    }

    const redirectToRegister = () => {
        router("/register");
    }

    const loginVariants = {
        initial: {
            scale: 0
        },
        animate: {
            scale: 1
        }
    }

    const transitions = {
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 0.5
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen dark bg-blue-gray-900">
                <motion.div variants={loginVariants} initial="initial" animate="animate" transition={transitions} className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold text-gray-200 mb-4">Login</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col">
                        <input onChange={handleChange} name="email" placeholder="Email address" className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="email" />
                        <input onChange={handleChange} name="password" placeholder="Password" className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="password" />
                        <div className="flex items-center justify-between flex-wrap">
                            <label className="text-sm text-gray-200 cursor-pointer">
                            <input className="mr-2" id="remember-me" type="checkbox" />
                            Remember me
                            </label>
                            <p className="cursor-pointer text-sm text-blue-500 hover:underline mb-0.5">Forgot password?</p>
                            <p className="text-white mt-4"> Don't have an account?<span className="ml-2 hover:underline text-blue-500 cursor-pointer" onClick={redirectToRegister}>Signup</span></p>
                        </div>
                        <button className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150" type="submit">Login</button>
                    </form>
                </motion.div>
            </div>
        </>
    )
}

export default Login;