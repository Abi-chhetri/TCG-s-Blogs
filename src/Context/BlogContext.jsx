import { useState,createContext } from "react";

export const BlogContext=createContext();

export const BlogContextProvider=({ children })=>{
    const [blogs,setBlogs]=useState([]);
    const [userBlogChanged,setUserBlogChanged]=useState(false);
    const [blogId, setBlogId] = useState(null)

    return (
        <BlogContext.Provider value={{blogs, setBlogs, userBlogChanged, setUserBlogChanged, blogId, setBlogId}}>
            {children}
        </BlogContext.Provider>
    )
}
