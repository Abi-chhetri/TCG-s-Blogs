import {  useRef, useState } from "react";
import logWall from '../assets/logWall.png'
import { NavLink, useNavigate} from "react-router-dom";
import { useContext } from "react";
import { JwtTokenContext } from "../Context/JwtToken";
import '../MediaQueries/Log&Reg.css'

const Login=()=>{
    const passwordRef=useRef(null);
    const eyeRef=useRef(null);
    const [userName,setUserName]=useState("");
    const [password,setPassword]=useState("");
    const {setToken, setUserNameC, setPasswordC, expiration, setExpiration} = useContext(JwtTokenContext)
    const [errorDisplay,setErrorDisplay]=useState('');
    const [successDisplay,setSuccessDisplay]=useState('');
    const navigate = useNavigate();


    function eyeChanger(){
        if (passwordRef.current && eyeRef.current) {
            if (passwordRef.current.type === "password") {
                eyeRef.current.innerText = "🙈"; // closed eye
            } 
            else {
                eyeRef.current.innerText = "👁️"; // open eye
            }
        }
    }

    function hideShow() {
    if (passwordRef.current && eyeRef.current) {
      if (passwordRef.current.type === "password") {
        passwordRef.current.type = "text";
        eyeRef.current.innerText = "👁️"; // closed eye
      } 
      else {
        passwordRef.current.type = "password";
        eyeRef.current.innerText = "🙈"; // open eye
      }
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
        const sendData = await fetch("https://blog-backend-production-7482.up.railway.app/blog/sign-up/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userName: userName,
                password: password,
            })
        });

        if (!sendData.ok) {
            throw new Error(`HTTP error! status: ${sendData.status}`);
        }

        const tokens = await sendData.text();  // Get the JWT token as text
        setToken(tokens);
        setExpiration(false)
        setUserNameC(userName)
        setPasswordC(password)
        const timeOut=setTimeout(()=>setSuccessDisplay("Successfully Logged In"),0)
        setTimeout(()=>{
            navigate("/blogs")
            clearTimeout(timeOut)
            setSuccessDisplay("")
        },1000)

        // Store the token
        localStorage.setItem('authToken', tokens);

        setUserName("")
        setPassword("")
        
    } catch (error) {
        console.error("❌ Login error:", error);
        const timeOut=setTimeout(()=>setErrorDisplay("Login failed: " + error.message),0)
        setTimeout(()=>{
            clearTimeout(timeOut)
            setErrorDisplay("")
        },4000)
    }
  }


    return (
        <>
        {expiration ? <p className="bg-red-700 text-white flex justify-center items-center">Session Expired: Please Login again to view blogs</p>:""}
        {
            successDisplay.length>1? <p className="bg-green-700 text-white flex justify-center items-center">
                {successDisplay}
            </p>:
            <p className="bg-red-600 text-white flex justify-center items-center">
                {errorDisplay}
            </p>
        }
        <main>
            <section className="h-lvh w-screen flex">
                <div className="h-full w-2/3" id="img">
                    <img src={logWall} className="h-full w-full object-cover object-center" alt="authentication image" />
                </div>

                <div className="bg-blue-100 h-full min-w-1/2 flex flex-col justify-center gap-5 items-center" id="form">
                    <div className="">
                        Your Trusted Gateway
                    </div>
                    <div className="flex flex-col items-center">
                        <h1 className="text-3xl">Welcome to TCG's</h1>
                        <h2 className="text-2xl text-blue-500">LogIn Page</h2>
                    </div>

                    <form 
                    className="border-2 border-blue-700 w-70 h-75 rounded-2xl flex flex-col gap-3 items-center justify-center py-4" 
                    onSubmit={handleSubmit}
                    >

                        <input 
                        className="h-7 w-50 placeholder:text-xs text-xs rounded-2xl px-2 focus:outline-none focus:border-green-600 border-2 border-black " 
                        type="text" 
                        value={userName}
                        onChange={(e)=> setUserName(e.target.value)}
                        placeholder="username or phone"
                        required
                        />

                    <div className="relative w-50">
                            <input
                            className="h-7 w-full placeholder:text-xs text-xs rounded-2xl px-2 pr-8 focus:outline-none focus:border-green-600 border-2 border-black"
                            type="password"
                            ref={passwordRef}
                            value={password}
                            onChange={(e)=>{
                                eyeChanger();
                                setPassword(e.target.value)
                            }}
                            placeholder="password" 
                            required
                            />

                            <button
                            type="button"
                            className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-600 hover:text-black"
                            onClick={hideShow}
                            ref={eyeRef}
                            >
                            🙈
                            </button>

                        </div>

                    <div className="flex flex-col items-end w-full px-9 gap-3">
                            <button
                            className="underline text-sm text-blue-900 pr-2"
                            onClick={()=> navigate("/forgotPassword")}
                            >
                                Forgot password ?
                            </button>

                            <button 
                            type="submit"
                            className="border-2 font-bold border-blue-600 bg-blue-600 text-white px-2 py-1 w-full rounded-xl text-sm"
                            >
                                Login
                            </button>
                    </div>

                    <div className="flex flex-col items-center w-full px-9 gap-3">
                            <p
                            className="text-sm text-black pr-2"
                            >
                                Donot have account ?
                            </p>

                            <NavLink
                            to="/auth/signup" 
                            type="submit" 
                            className="border-2 font-bold border-green-600 bg-green-600 text-center text-white py-1 w-full rounded-xl text-sm"
                            >
                            Register
                            </NavLink>
                    </div>

                    </form>
                </div>
            </section>
        </main>
        </>
    )
}

export default Login;