import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { OtpContext } from "../Context/OtpContext";
import '../Signup.css'
import '../MediaQueries/profile.css'


export const ForgotPassword=()=>{
    const {userNameOtp,setUserNameOtp, otp, setOtp, setToken}= useContext(OtpContext)
    const [load,setLoad]= useState(false)
    const navigate=useNavigate()
    const [found,setFound] =useState(false)

    async function otpChecker() {
        try{
            setLoad(true)
            const response=await fetch("https://blog-backend-production-7482.up.railway.app/blog/sign-up/otp",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    "userName":userNameOtp
                })
            });

            const jsonData=await response.json()
            setOtp(jsonData.otp)
            setToken(jsonData.token)

            if(response.status===200 && jsonData.token.length){
                setLoad(false);
                navigate("/otp");
            }
       }
       catch(err){
            setLoad(false)
            setFound(true)
        console.error("something went wrong while resetting password", err)
       }
    }


    return (
        <main className="h-96 w-screen flex flex-col gap-5 justify-center items-center bg-gray-300 ">
           {
            load ?
            <div className="text-3xl">
                Authenticating <span className="loading"></span>
            </div>
            :<>
                <div className="flex gap-3" id="label">
                    <label>Username: </label>
                    <input 
                        value={userNameOtp}
                        onChange={(e)=>setUserNameOtp(e.target.value)}
                        placeholder="username" 
                        type="text" className="border-2 border-green-black rounded text-sm p-1 focus:outline-none focus:border-green-500" 
                        required/>
                </div>
                <button
                    onClick={() => {
                        if (userNameOtp.length > 3) {
                            otpChecker();
                        }
                    }}
                    className="border-1 bg-blue-600 text-white p-1 rounded">
                        Continue
                </button>
                {
                    found ?
                        <p className="text-sm text-red-500">
                            Username not found
                        </p>
                    :
                        <>
                        </>
                }
            </>
           }
        </main>
    )
}
