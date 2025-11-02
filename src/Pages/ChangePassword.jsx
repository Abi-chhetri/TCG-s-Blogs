import { useContext, useState } from "react"
import { JwtTokenContext } from "../Context/JwtToken"
import '../Signup.css'
import { UserContext } from "../Context/UserContext"
import { useNavigate } from "react-router-dom"
import { OtpContext } from "../Context/OtpContext"
import '../MediaQueries/profile.css'

export const ChangePassword=()=>{
    const {token}=useContext(JwtTokenContext)
    const {userName}=useContext(UserContext)
    const {userNameOtp}= useContext(OtpContext)
    const [pass,setPass]=useState('')
    const [pass1,setPass1]=useState('')
    const [load,setLoad]=useState(false)
    const [same,setSame]=useState(false)
    const [succText,setSuccText]=useState("")
    const navigate=useNavigate()


    async function changePassword() {
        setLoad(true)
        try{
            const response=await fetch("https://blog-backend-production-7482.up.railway.app/blog/users/updatePassword",{
                method:"PUT",
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    "userName":userName || userNameOtp,
                    "password":pass
                })
            });

            const responseText=await response.text();

            if(response.ok){
                setLoad(false)
                setSuccText(responseText)
                setTimeout(()=>{
                    setSuccText("")
                    navigate("/profile")
                },2000)
            }

            if(response.status === 409){
                setSame(true);
                setLoad(false)
                setTimeout(() => setSame(false), 5000);
                return
            }
        }
        catch(err){
            console.error("Error while changing password",err)
        }
        finally{
            setPass("")
            setPass1("")
        }
    }

    return (
        <>
        {succText.length ? <p className="p-1 bg-green-700 text-white text-center">{succText}</p>:""}
         <div className="bg-gray-300 p-2">
            <button className="border-2 border-black px-2 active:scale-95" 
                onClick={()=>{
                    navigate("/profile")
                    window.location.reload()
                }
                }
            > 
                ← Back 
            </button>
        </div>
        <div className="h-90 bg-gray-300 min-w-screen flex justify-center items-center">
            {
                load ?
                <div>
                    Changing Password <span className="loading"></span>
                </div>
                :
                <div className="border-2 border-black w-max flex flex-col items-center p-2 gap-4 rounded">
                    {same ? <p className="text-red-500">Error : Your Current password cannot be your next password.</p>:""}
                    { pass.length <=7 ?<p className="text-xs text-red-500">Password must be of 8 characters</p>:""}
                    { pass.trim() == pass1.trim() ? "":<p className="text-xs text-red-500">Password didn't match with each other</p>}
                    <div className="flex gap-2" id="label">
                        <label className="w-45">New Password</label>
                        <input
                        type="text" 
                        placeholder="New Password"  
                        value={pass} 
                        onChange={(e)=>setPass(e.target.value)}                     
                        className="p-1 outline-none border-1 border-black"/>
                    </div>
                    <div className="flex gap-2" id="label">
                        <label className="w-45">Confirm New Password</label>
                        <input
                        type="text" 
                        placeholder="Confirm Password" 
                        value={pass1} 
                        onChange={(e)=>setPass1(e.target.value)}
                        className="p-1 outline-none border-1 border-black"/>
                    </div>
                    <button
                    className={`px-2 border-2  w-max text-white rounded ${pass.trim()===pass1.trim() && pass.length > 7 ? "bg-blue-500 border-blue-500":"bg-blue-100 border-blue-100"}`}
                    onClick={changePassword}
                    >
                        Change
                    </button>
                </div>
                
            }
        </div>
        </>
    )
}