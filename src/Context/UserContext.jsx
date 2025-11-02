import { createContext, useState} from "react";

export const UserContext=createContext();

export const UserContextProvider=({children})=>{
    const [userName,setUserName]=useState("");
    const [email,setEmail]=useState("");
    const [createdDate,setCreatedDate]=useState("")
    const [userBlog,setUserBlog]=useState([]);
    const [isActive,setIsActive]=useState("Off")
    const [genres,setGenres]=useState([])
    const [newsUpdate, setNewsUpdate]=useState(null)
   return (
    <UserContext.Provider value={
        {
            userName, setUserName,
            email, setEmail,
            createdDate, setCreatedDate,
            userBlog, setUserBlog,
            isActive, setIsActive,
            genres, setGenres,
            newsUpdate, setNewsUpdate 
        }
        }>
        {children}
    </UserContext.Provider>
   )
}