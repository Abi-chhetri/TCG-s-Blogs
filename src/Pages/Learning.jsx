import { useContext, useEffect, useState } from "react"
import { JwtTokenContext } from "../Context/JwtToken"
import { LearningZoneContext } from "../Context/LearningZoneContext"
import '../Signup.css'
import { useNavigate } from "react-router-dom"


export const LearningZone=()=>{

    const {token, setExpiration, setToken}=useContext(JwtTokenContext)
    const {learningData,setLearningData}=useContext(LearningZoneContext)
    const [bool,setBool]=useState(true)
    const [openId, setOpenId] =useState(null)
    const [onReload,setOnRealod]=useState(false)
    const navigate=useNavigate()

    useEffect(() => {
    if (performance.getEntriesByType("navigation")[0].type === "reload") {
        setOnRealod(true);
    }
    }, []);

    useEffect(()=>{
        async function fetchLearningData() {
            try{
                const response=await fetch("https://blog-backend-production-7482.up.railway.app/blog/Learning-Zone",{
                    method:"GET",
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":`Bearer ${token}`
                    }
                });

                const jsonData=await response.json()
                setLearningData(jsonData)
                console.log(jsonData)

                if(response.status===401){
                    navigate("/auth/login")
                    setToken("")
                    localStorage.removeItem('authToken');
                    setExpiration(true)
                }
            }
            catch(err){
                console.error("Something went wrong while fetching learning zone ",err)
            }
        }

        fetchLearningData()

    },[onReload])

    return (
        <>
        <main className="p-8 bg-gray-900 text-white">
            {
                learningData.length ?
                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
                                {learningData.map((blog) =>(
                                    <div 
                                    key={blog.id} 
                                    className="border rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
                                    >
                                    <div className="relative">
                                        <div className="text-sm text-gray-500 mb-2">{blog.title}</div>
                                        
                                        <div className="absolute top-0 right-0 flex gap-6">
                                            {
                                                bool ? 
                                                <button 
                                                    onClick={()=>{
                                                        setBool((prev)=>!prev)
                                                        setOpenId(blog.id)
                                                    }}
                                                    className="border-2 border-white px-2 rounded active:scale-95 hover:border-red-500 hover:text-red-500">
                                                        <i className="fa fa-chevron-up"></i>
                                                </button>
                                                :
                                                <button 
                                                    onClick={()=>{
                                                        setBool((prev)=>!prev)
                                                        setOpenId(blog.id)
                                                    }}
                                                    className="border-2 border-white px-2 rounded active:scale-95 hover:border-red-500 hover:text-red-500">
                                                        <i className="fa fa-chevron-down"></i>
                                                </button>
                                            }
                                        </div>
                                    </div>
                                    <h2 className="text-2xl font-semibold mb-2 text-gray-400 hover:text-blue-600 transition-colors duration-300">{blog.title}</h2>
                                    
                                    {
                                        bool ?
                                        <></>
                                        :
                                        openId === blog.id ?
                                        <p className="text-gray-300 whitespace-pre-line text-justify">{blog.content}</p>
                                        :
                                        <></>
                                    }
                                    </div>
                                ))}
                    </div>
                    :
                    <div className=" w-full h-screen flex justify-center items-center text-6xl">
                        Loading<span className="loading"></span>
                    </div>
            }
        </main>
        </>
    )
}