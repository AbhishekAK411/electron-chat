import axios from "axios";
import { createContext, useEffect, useReducer } from "react";

export const authContext = createContext();

const initialState = {user: null};

const reducer = (state, action) => {
    switch (action.type) {
        case "login":
            return {...state, user: action.payload};
        case "logout":
            return {...state, user: null}
        default:
            return state;
    }
}

const HandleAuthContext = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const login = (userdata) => {
        if(userdata.token){
            localStorage.setItem("electron", JSON.stringify(userdata.token));
        }
        dispatch({
            type: "login",
            payload: userdata.payload
        });
    }

    const logout = () => {
        localStorage.removeItem("electron");
        dispatch({
            type: "logout"
        });
    }

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("electron"));
        const checkUser = async() => {
            if(token){
                const axiosRequest = await axios.post("http://localhost:8000/app/getCurrentUser", {token});
                const axiosResponse = axiosRequest?.data;
                if(axiosResponse?.success){
                    dispatch({
                        type: "login",
                        payload: axiosResponse?.payload
                    });
                }
            }
        }
        checkUser();

        const handleStorageEvent = async(e) => {
            if(e.key === "socket"){
                const token = JSON.parse(e.newValue);
                if(token){
                    const axiosRequest = await axios.post("http://localhost:8000/app/getCurrentUser", {token});
                    const axiosResponse = axiosRequest?.data;
                    if(axiosResponse?.success){
                        dispatch({
                            type: "login",
                            payload: axiosResponse?.payload
                        });
                    }
                }else{
                    dispatch({
                        type: "logout"
                    });
                }
            }
        }
        window.addEventListener("storage", handleStorageEvent);

        return () => {
            window.removeEventListener("storage", handleStorageEvent);
        }
    }, [])

    return (
        <authContext.Provider value={{ state, login,logout }}>
            {children}
        </authContext.Provider>
    )
}

export default HandleAuthContext;