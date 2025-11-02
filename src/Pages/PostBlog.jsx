import { useContext, useEffect, useState } from "react"
import { JwtTokenContext } from "../Context/JwtToken"
import { UserContext } from "../Context/UserContext";
import { BlogContext } from "../Context/BlogContext";
import { useNavigate } from "react-router-dom";
import '../MediaQueries/profile.css'


export const PostBlog=()=>{

    const {token, setToken, setExpiration} =useContext(JwtTokenContext);
    const {genres, setGenres, setUserBlog}=useContext(UserContext)
    const {setUserBlogChanged}=useContext(BlogContext)
    const [selected, setSelected]=useState("AI")
    const [titleB,setTitleB] =useState("")
    const [contentB,setContentB]=useState("")
    const [suctext,setSucText]=useState("")
    const navigate=useNavigate()

    useEffect(()=>{
        async function getGenre() {
            try{
                const response=await fetch("https://blog-backend-production-7482.up.railway.app/blog/users/getGenre",{
                    method:"GET",
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":`Bearer ${token}`
                    }
                });

                if(response.status===401){
                    navigate("/auth/login")
                    setToken("")
                    localStorage.removeItem('authToken');
                    setExpiration(true)
                }

                const textData= await response.text()
                try{
                    const jsonData=JSON.parse(textData);
                    setGenres(jsonData)
                }
                catch(err){
                    console.error("There was an error while parsing raw text into json ",err)
                }
            }
            catch(err){
                console.error("Error: while fetching genre ",err)
            }

        }

        if(token){
            getGenre()
        }
    },[token])

    async function handleSubmit(e) {
        e.preventDefault();

        const newBlog={
            "title": titleB,
            "content":contentB,
            "genre":selected
        }

        try{
            const response=await fetch("https://blog-backend-production-7482.up.railway.app/blog/blogs",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                },
                body:JSON.stringify(newBlog)
            });

            if(response.status===401){
                    navigate("/auth/login")
                    setToken("")
                    localStorage.removeItem('authToken');
                    setExpiration(true)
            }

            const responseText= await response.text();
            setSucText(responseText);

            if(response.status===201){
                setUserBlog[(prev)=>[...prev,newBlog]]
                setUserBlogChanged(true)
                setTitleB("")
                setContentB("")
                setSelected("AI")
            }

            setTimeout(()=>{
                 setSucText("")
                 navigate("/blogs")
                },1500)

        }
        catch(err){
            console.error("There was an error while posting blog by user ",err)
        }
    }

    return (
        <>
        {suctext.length ? <p className=" text-center bg-green-700 text-white">{suctext}</p>:""}
        <main className="p-2 w-full min-h-screen flex justify-center items-center bg-gray-300 font-mono">
            <form className="w-max h-max flex gap-4 flex-col" onSubmit={handleSubmit}>
                <div className="flex gap-4" id="label">
                    <label className="w-20">Title:</label>
                    <input
                        type="text" 
                        value={titleB}
                        id="box"
                        onChange={(e)=>setTitleB(e.target.value)}
                        className="border-b-2 border-black px-1 focus:outline-none focus:border-green-500 w-100"
                        required/>
                </div>

                <div className="flex gap-4" id="label">
                    <label className="w-20">Content:</label>
                    <textarea
                        value={contentB}
                        id="box"
                        onChange={(e)=>setContentB(e.target.value)}
                        className="px-1 overflow-y-scroll line-clamp-3 text-justify focus:outline-none border-2 border-black focus:border-green-500 w-100 h-100"
                        required
                    />
                </div>
                <div className="flex gap-4" id="label">
                    <label className="w-20">Category:</label>
                    <select value={selected}  onChange={(e)=>setSelected(e.target.value)}>
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
                        Post
                    </button>
                </div>
            </form>
        </main>
        {suctext.length ? <p className=" text-center bg-green-700 text-white">{suctext}</p>:""}
        </>
    )
}