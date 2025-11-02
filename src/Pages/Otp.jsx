import { useContext, useState, useEffect } from "react"
import { OtpContext } from "../Context/OtpContext"
import { useNavigate } from "react-router-dom"
import '../MediaQueries/profile.css'


export const Otp=()=>{
    const {userNameOtp , otp, token, setOtp}=useContext(OtpContext)
    const [exp, setExp]=useState(false)
    const [wrongOtp,setWrongOtp]=useState(false)
    const [otpB, setOtpB]=useState("")
    const navigate=useNavigate()

    const [timeLeft, setTimeLeft] = useState(120); // 2 minutes = 120 seconds

    useEffect(() => {
        if (timeLeft <= 0) return;

        const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer); // cleanup
    }, [timeLeft,otp]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    if(otp.length===6){
            const timeOut=setTimeout(()=>setExp(true),0)

            setTimeout(()=>{
                clearTimeout(timeOut)
                setOtp("")
                setExp(false)
            },120000)
        }

    function verifyOtp(){
        if(otp==otpB){
            localStorage.setItem("authToken",token)
            navigate("/profile/changePassword")
            window.location.reload()
            setWrongOtp(false)
        }
        else{
            setWrongOtp(true)
        }
    }

    return (
        <main className="h-96 w-screen flex flex-col gap-5 justify-center items-center bg-gray-300 ">
            <div className="flex gap-3" >
                <label>OTP: </label>
                <input 
                    inputMode="numeric" 
                    placeholder="One time password" 
                    value={otpB}
                    onChange={(e)=>setOtpB(e.target.value)}
                    maxLength={6}
                    type="text" 
                    className="border-2 border-green-black rounded text-sm p-1 focus:outline-none focus:border-green-500" 
                    required/>
            </div>
            <div className="flex gap-4" id="label">
                <button
                    onClick={()=>{
                    if( otpB.length === 6) {
                            verifyOtp()
                    }
                    }}
                    className="border-1 bg-green-600 text-white p-1 rounded">
                        Verify
                </button>
                <button 
                    onClick={()=>{ 
                        navigate("/forgotPassword")
                        window.location.reload()
                    }}
                    className="border-1 p-1 rounded">
                    Back
                </button>
            </div>
            {exp ? 
                <p className="text-sm text-red-500">
                    Your OTP will expire in{" "}
                    {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                </p>
            :
            ""}
            {
                wrongOtp && otpB.length ?
                    <p className="text-sm text-red-500">
                        Incorrect Otp
                    </p>
                :
                   
                    otpB== otp && otpB.length ?
                        <p className="text-sm text-green-700">
                            Verified ✔️
                        </p>
                        :
                        ""
            }
            {
                timeLeft <= 0 ?
                    <p className="text-sm text-red-500">
                       your otp has been expired
                    </p>
                    :
                    <>
                    </>
            }
        </main>
    )
}
