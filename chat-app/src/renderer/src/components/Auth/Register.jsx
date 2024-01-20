import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const Register = () => {

    const [userdata, setUserData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    }); 

    const router = useNavigate();

    const handleChange = (e) => {
        setUserData({...userdata, [e.target.name]: e.target.value});
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const registerRequest = await axios.post("http://localhost:8000/app/register", {
                username: userdata?.username,
                email: userdata?.email,
                password: userdata?.password,
                confirmPassword: userdata?.confirmPassword
            });

            const registerResponse = registerRequest.data;
            if(registerResponse?.success){
                toast.success(registerResponse?.message);
                setUserData({
                    username: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                });
                router("/");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }

    const redirectToLogin = () => {
        router("/");
    }

    const registerVariants = {
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
                <motion.div variants={registerVariants} initial="initial" animate="animate" transition={transitions} className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold text-gray-200 mb-4">Register</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col">
                        <input onChange={handleChange} name="username" placeholder="Username" className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="text" />
                        <input onChange={handleChange} name="email" placeholder="Email" className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="email" />
                        <input onChange={handleChange} name="password" placeholder="Password" className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="password" />
                        <input onChange={handleChange} name="confirmPassword" placeholder="Confirm Password" className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="password" />
                        <div className="flex items-center justify-between flex-wrap">
                            <label className="text-sm text-gray-200 cursor-pointer">
                            <input className="mr-2" id="remember-me" type="checkbox" />
                            Remember me
                            </label>
                            <p className="select-none text-sm text-gray-800 mb-0.5">Forgot password?</p>
                            <p className="text-white mt-4">Already have an account?<span onClick={redirectToLogin} className="ml-2 hover:underline text-blue-500 cursor-pointer">Sign In</span></p>
                        </div>
                        <button className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150">Register</button>
                    </form>
                </motion.div>
            </div>
        </>
    )
}

export default Register;