import { createContext, useState } from "react";

export const OtpContext=createContext()


export const OtpContextProvider=({children})=>{
    const [userNameOtp,setUserNameOtp]=useState("")
    const [otp, setOtp] =useState('')
    const [token, setToken] =useState('')

    return (
        <OtpContext.Provider value={{userNameOtp, setUserNameOtp, otp, setOtp, token, setToken}}>
            {children}
        </OtpContext.Provider>
    )
}