import React,{createContext, useEffect, useState} from "react";

export const JwtTokenContext=createContext()

export const JwtTokenContextProvider=({ children })=>{
    const [token, setToken]=useState('');
    const [userNameC, setUserNameC]=useState('');
    const [passwordC, setPasswordC]=useState('');
    const [expiration, setExpiration]=useState(false);

   useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            setToken(token);
        }
    }, []);

    return (
        <JwtTokenContext.Provider value={{token, setToken, userNameC, setUserNameC, passwordC, setPasswordC , expiration, setExpiration}}>
            {children}
        </JwtTokenContext.Provider >
    )
}