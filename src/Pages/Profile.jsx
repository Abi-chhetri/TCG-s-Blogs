import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { JwtTokenContext } from "../Context/JwtToken";
import { UserContext } from "../Context/UserContext"
import { BlogContext } from "../Context/BlogContext";
import '../MediaQueries/profile.css'

export const Profile=()=>{
    const navigate=useNavigate()
    const {setToken, token}=useContext(JwtTokenContext)
    const {userName,userBlog ,isActive,createdDate, email, newsUpdate}=useContext(UserContext);
    const {setUserBlogChanged, setBlogId} = useContext(BlogContext)
    const [dialogBox1,setDialogBox1]=useState(null)
    const [dialogBox2,setDialogBox2]=useState(null)

    async function deleteBlogById() {
        try{
            if(dialogBox2 != null && token){
                const response = await fetch(`https://blog-backend-production-7482.up.railway.app/blog/blogs/id/${dialogBox2}`,{
                    method:"DELETE",
                    headers:{
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                })

                const responseText=await response.text();
                setUserBlogChanged(true)
            }
        }
        catch(err){
            console.error("There was an error while deleting blog ",err)
        }
        finally{
            setDialogBox2(null)
            navigate("/blogs")
        }
    }



    return <>
        <div className="h-max p-2 min-w-screen flex justify-between items-center backdrop:blur-3xl bg-gradient-to-r from-amber-50 via-amber-500 to-indigo-600 text-black px-4">
            <div className="text-xl">
               <i className="fa fa-lock"></i>&nbsp; {userName}
            </div>
            <button 
            className="border-2 border-white p-1 rounded px-2 text-white hover:bg-red-600 active:scale-95 font-bold"
            onClick={()=>{
                setToken("")
                localStorage.removeItem("authToken")
                navigate("/auth/login")
                window.location.reload();
                }}>
                Log out
            </button>
        </div>

        <div className="min-w-screen min-h-screen bg-gray-200 font-mono p-2 flex flex-col gap-4" id="main">

            <div className="flex flex-col justify-center items-center p-2 gap-4">
                 <div className="flex items-center" id="label">
                    <label className="w-48 font-semibold">Email:</label>
                    <div className="border border-black px-3 py-2 rounded w-80 bg-white" id="box">
                    {email}
                    </div>
                </div>

                {/* Active Status */}
                <div className="flex items-center" id="label">
                    <label className="w-48 font-semibold">Active Status:</label>
                    <div className="border border-black px-3 py-2 rounded w-80 bg-white" id="box">
                    {isActive}
                    </div>
                </div>

                <div className="flex items-center" id="label">
                    <label className="w-48 font-semibold">News & updates:</label>
                    <div className="border border-black px-3 py-2 rounded w-80 bg-white" id="box">
                    {newsUpdate ? "Subscribed":"Not Subscribed"}
                    </div>
                </div>

                {/* Registered Date */}
                <div className="flex items-center" id="label">
                    <label className="w-48 font-semibold">Your Account Registered Date:</label>
                    <div className="border border-black px-3 py-2 rounded w-80 bg-white" id="box">
                    {createdDate}
                    </div>
                </div>
            </div>

            <hr />

            <label className="text-center text-2xl font-bold">Security</label>
            <div className="w-full h-max flex flex-col gap-4 justify-center items-center">
                <button 
                className="border-2 border-black p-2 w-100 flex justify-center rounded hover:scale-105"
                onClick={()=>navigate("/profile/changePassword")}
                id="box"
                >
                    Change Password →
                </button>
                <button 
                className="border-2 w-100  border-black p-2 flex justify-center rounded hover:scale-105"
                onClick={()=>navigate("/profile/changeUserName")}
                id="box"
                >
                    Change Username →
                </button>
            </div>

            <hr />
            <h1 className="text-center font-bold text-3xl text-transparent [-webkit-text-stroke:1px_#000]">Your Blogs</h1>
            <hr />

            {
                userBlog.length ? 
                 <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
                        {userBlog.map((blog) =>(
                            <div 
                            key={blog.id} 
                            className="border rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
                            >
                            <div className="relative">
                                <div className="text-sm text-gray-500 mb-2">{blog.genre}</div>
                                
                                <div className="absolute top-0 right-0 flex gap-6">
                                    <button 
                                        onClick={()=>{
                                            setDialogBox1(blog.id)
                                            setDialogBox2("")
                                        }}
                                        className="border-2 border-black px-2 rounded active:scale-95 hover:border-red-500 hover:text-red-500">
                                            <i className="fa fa-pencil" />
                                    </button>
                                    <button 
                                        onClick={()=>{
                                            setDialogBox2(blog.id)
                                            setDialogBox1("")
                                        }}
                                        className="border-2 border-black px-2 rounded active:scale-95 hover:border-red-500 hover:text-red-500">
                                            <i className="fa fa-trash"></i>
                                    </button>
                                </div>
                                {
                                        dialogBox1 === blog.id  ?
                                            <div className="absolute flex flex-col justify-around z-50 bg-amber-700 text-white backdrop-blur-2xl h-40 -top-10 right-1/3 rounded p-2">
                                                <p>Are You Sure You Want To Edit It</p>
                                                <div className="flex justify-around h-max">
                                                <button
                                                    onClick={()=>{
                                                        setBlogId(blog.id)
                                                        setDialogBox1("")
                                                        navigate("/updateBlog")
                                                    }}
                                                    className="border-2 border-white px-2 rounded active:scale-95">
                                                    Yes
                                                </button>

                                                <button
                                                    onClick={() => setDialogBox1(null)}
                                                    className="border-2 border-white px-2 rounded active:scale-95">
                                                    No
                                                </button>
                                                </div>
                                            </div>
                                        :
                                            <>
                                            </> 
                                    }
                                {
                                        dialogBox2 === blog.id  ?
                                            <div className="absolute flex flex-col justify-around z-50 bg-amber-700 text-white backdrop-blur-2xl h-40 -top-10 right-1/3 rounded p-2">
                                                <p>Are You Sure You Want To Delete It</p>
                                                <div className="flex justify-around h-max">
                                                <button
                                                    onClick={()=> deleteBlogById()}
                                                    className="border-2 border-white px-2 rounded active:scale-95">
                                                    Yes
                                                </button>

                                                <button
                                                    onClick={() => setDialogBox2(null)}
                                                    className="border-2 border-white px-2 rounded active:scale-95">
                                                    No
                                                </button>
                                                </div>
                                            </div>
                                        :
                                            <>
                                            </> 
                                    }
                            </div>
                            <h2 className="text-2xl font-semibold mb-2 text-gray-900 hover:text-blue-600 transition-colors duration-300">{blog.title}</h2>
                            
                            {
                                blog.image_url ? 
                                    <div className="h-max w-full overflow-hidden flex justify-center mb-5">
                                        <img 
                                            src={blog.image_url} 
                                            alt={blog.genre} 
                                            className="h-80 w-full object-cover object-center"
                                            onError={(e) => (e.target.style.display = 'none')}/>
                                    </div>
                                    :
                                    <>
                                    </>
                            }
                            
                            <p className="text-gray-700 whitespace-pre-line text-justify">{blog.content}</p>
                            <div className="mt-4 text-sm text-gray-400">{blog.dateTime}</div>
                            </div>
                        ))}
                </div>
                :
                <div className="flex justify-center items-center font-bold text-red-500 text-2xl h-60">
                    Not Posted any Blog Yet
                </div>
            }
        </div>

    </>;
}