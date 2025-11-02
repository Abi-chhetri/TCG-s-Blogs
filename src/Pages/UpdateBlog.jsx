

import { useContext, useEffect, useState } from "react"
import { JwtTokenContext } from "../Context/JwtToken"
import { UserContext } from "../Context/UserContext";
import { BlogContext } from "../Context/BlogContext";
import { useNavigate } from "react-router-dom";
import '../MediaQueries/profile.css'


export const UpdateBlog=()=>{

    const {token} =useContext(JwtTokenContext);
    const {genres, userBlog, setUserBlog}=useContext(UserContext)
    const {setUserBlogChanged, blogId}=useContext(BlogContext)
    const [selected, setSelected]=useState("AI")
    const [contentB,setContentB]=useState("")
    const [suctext,setSucText]=useState("")
    const [titleB,setTitleB] =useState("")
    const navigate=useNavigate()

    useEffect(()=>{
        const found=userBlog?.filter((eachBlog)=>eachBlog.id===blogId)
        setTitleB(found[0]?.title)
        setContentB(found[0]?.content)
        setSelected(found[0]?.genre)
    },[blogId])

    async function handleSubmit(e) {
        e.preventDefault();

        const newBlog={
            "title": titleB,
            "content":contentB,
            "genre":selected
        }

        try{
            const response=await fetch(`https://blog-backend-production-7482.up.railway.app/blog/blogs/id/${blogId}`,{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                },
                body:JSON.stringify(newBlog)
            });

            const responseText= await response.text();
            setSucText(responseText);

            if(response.status===202){
                setUserBlog[(prev)=>[...prev,newBlog]]
                setUserBlogChanged(true)
                setTitleB("")
                setContentB("")
                setSelected("AI")
                navigate("/blogs")
            }

            setTimeout(()=> setSucText(""),2500)


        }
        catch(err){
            console.error("There was an error while posting blog by user ",err)
        }
    }

    return (
        <>
        {suctext.length ? <p className=" text-center bg-green-700 text-white">{suctext}</p>:""}
        <div className="bg-gray-300 p-2">
            <button className="border-2 border-black px-2 active:scale-95" onClick={()=> navigate("/profile")}> ← Back </button>
        </div>
        <main className="p-2 w-full min-h-screen flex justify-center items-center bg-gray-300 font-mono">
            <form className="w-max h-max flex gap-4 flex-col" onSubmit={handleSubmit}>
                <div className="flex gap-4" id="label">
                    <label className="w-20">Title:</label>
                    <input
                        type="text" 
                        value={titleB}
                        onChange={(e)=>setTitleB(e.target.value)}
                        className="border-b-2 border-black px-1 focus:outline-none focus:border-green-500 w-100"
                        id="box"
                        required/>
                </div>

                <div className="flex gap-4" id="label">
                    <label className="w-20">Content:</label>
                    <textarea
                        value={contentB}
                        onChange={(e)=>setContentB(e.target.value)}
                        className="px-1 line-clamp-3 text-justify focus:outline-none border-2 border-black focus:border-green-500 w-100 h-100 overflow-y-scroll"
                        id="box"
                        required
                    />
                </div>
                <div className="flex gap-4" id="label">
                    <label className="w-20">Category:</label>
                    <select value={selected} onChange={(e)=>setSelected(e.target.value)}>
                        {
                            genres.length ?
                                genres.map((genre)=>(
                                    <option key={genre}
                                        value={
                                            genre==="Brain_Computer_Interface" ?
                                                genre.replace("_","-").replaceAll("_"," ")
                                                :
                                                genre==="Audio_Video_Tech" ?
                                                    genre.replace("_","/").replaceAll("_"," ")
                                                    :
                                                    genre.replaceAll("_"," ")
                                        }>

                                        {
                                            genre==="Brain_Computer_Interface" ?
                                                genre.replace("_","-").replaceAll("_"," ")
                                                :
                                                genre==="Audio_Video_Tech" ?
                                                genre.replace("_","/").replaceAll("_"," ")
                                                :
                                                genre.replaceAll("_"," ")
                                        }
                                    </option>
                                ))
                                :
                                <option value="empty">empty</option>
                        }
                    </select>
                </div>
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white font-bold p-1 px-4 rounded w-max"
                    >
                        Update
                    </button>
                </div>
            </form>
        </main>
        {suctext.length ? <p className=" text-center bg-green-700 text-white">{suctext}</p>:""}
        </>
    )
}