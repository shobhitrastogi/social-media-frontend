import { useReducer } from "react";
import { createContext } from "react";
import AuthReducer from "./AuthReducer";
const INITIAL_STATE ={
    user:{
        _id: "65ec786068e8803a7ac8dad0",
        username: "admin",
        email: "admin@admin.com",
        password: "$2b$10$CXR2qVvz6mdvdTBoEE8vk.GcQsrTJE0xEIIsFisV3jNdpgpWCAwwu",
        profilePicture: "",
        coverPicture: "",
        followers: [],
        followings: ["followings"],
        isAdmin: false,
        },
    isFetching:false,
    error:false
};
export const AuthContext = createContext({INITIAL_STATE})

export const AuthContextProvider =({children})=>{
    const [state,dispatch] = useReducer(AuthReducer,INITIAL_STATE)
    return (
        <AuthContext.Provider value={{
            user:state.user,
            isFetching:state.isFetching,
            error:state.error,
            dispatch
        }}>{children} </AuthContext.Provider>
    )
}