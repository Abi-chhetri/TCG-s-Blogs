import { useEffect, useRef } from "react";
import logWall from '../assets/logWall.png'
import { useState } from "react";
import '../Signup.css'
import { useNavigate } from "react-router-dom";
import '../MediaQueries/Log&Reg.css'

const Login=()=>{
    const passwordRef=useRef(null);
    const eyeRef=useRef(null);
    const passwordRef2=useRef(null);
    const eyeRef2=useRef(null);
    const [username,setUserName]=useState("");
    const [password, setPassword]=useState("")
    const [password1, setPassword1]=useState("")
    const [userNameStatus, setUserNameStatus]=useState("");
    const [isAvailable, setIsAvailable]=useState(false)
    const[email,setEmail]=useState("")
    const [signedBox,setSignedBox]=useState('flex')
    const [signedMsgBox,setSignedMsgBox]=useState('hidden')
    const [signMsg,setSignMsg]=useState('Signing You In')
    const [display,setDisplay]=useState('')
    const [passLenCheck,setPassLenCheck]=useState(false);
    const navigate=useNavigate()


    useEffect(()=>{
      if(password.trim()===password1.trim() && (password.length >= 8 && password1.length >= 8)){
        setPassLenCheck(true)
      }
      else{
       setPassLenCheck(false)
      }
    },[password,password1])

    function eyeChanger(e){
          setPassword1(e.target.value)
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

    function eyeChanger2(e){
      setPassword(e.target.value)
        if (passwordRef2.current && eyeRef2.current) {
            if (passwordRef2.current.type === "password") {
                eyeRef2.current.innerText = "🙈"; // closed eye
            } 
            else {
                eyeRef2.current.innerText = "👁️"; // open eye
            }
        }
    }

    function hideShow2() {
    if (passwordRef2.current && eyeRef2.current) {
      if (passwordRef2.current.type === "password") {
        passwordRef2.current.type = "text";
        eyeRef2.current.innerText = "👁️"; // closed eye
      } 
      else {
        passwordRef2.current.type = "password";
        eyeRef2.current.innerText = "🙈"; // open eye
      }
    }
  }

  let available;
  
   useEffect(() => {
    if (username.length < 1) {
      setUserNameStatus(""); // empty if no username
      return;
    }

    let isCancelled = false; // to stop polling on unmount

    // Async function inside useEffect
    (async function checkUsername() {
      try {
        const response = await fetch(
          "https://blog-backend-production-7482.up.railway.app/blog/sign-up/check-userName",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userName: username.trim() }),
          }
        );
        available=await response.text();
        if (!isCancelled) {
          if (available === "true") {
            setIsAvailable(false)
            setUserNameStatus(
              <p className="text-xs text-red-600">username {username} Not Available</p>
            );
          } else {
            setIsAvailable(true)
            setUserNameStatus(
              <p className="text-xs text-green-700">username {username} Available</p>
            );
          }
        }
      } catch (error) {
        console.error(error);
      }

      // Schedule next check after 2 seconds if not cancelled
      if (!isCancelled) {
        setTimeout(checkUsername, 2000);
      }
    })(); // immediately invoke the async function

    return () => {
      isCancelled = true; // cleanup on unmount
    };
  }, [username]); // runs whenever username changes

  async function handleSubmit(e) {
    e.preventDefault();
    setSignedBox("hidden")
    setSignedMsgBox("flex")
    const sendData=await fetch("https://blog-backend-production-7482.up.railway.app/blog/sign-up",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(
        {
          userName: username.trim(),
          password: password.trim(),
          email: email
        }
      )
    });

    const resText=await sendData.text()

    if(resText.startsWith(username)){
      setSignedBox("flex")
      setSignedMsgBox("hidden")

      const timeOut= setTimeout(()=>{
        setDisplay(resText)
      },0)

      setTimeout(()=>{
        setDisplay("")
        navigate("/auth/login")
       clearTimeout(timeOut)
      },1500)
    }

    setUserName("")
    setPassword("")
    setPassword1("")
    setEmail("")

  }
    return (
        <>
        <p className="bg-green-500 text-white flex justify-center items-center">
          {display}
        </p>
        <main>
            <section className={`h-lvh w-screen ${signedBox}`}>
                 <div className="bg-blue-100 h-full w-1/2 flex flex-col justify-center gap-5 items-center" id="form">
                    <p>Your journey with Us Starts here.</p>
                    <div>
                        With Trusted Gateway
                    </div>
                    <div className="flex flex-col items-center">
                        <h1 className="text-3xl">Welcome to TCG's</h1>
                        <h2 className="text-2xl text-blue-500">Sign Up Page</h2>
                    </div>
                    <div>
                          {userNameStatus}
                    </div>

                    <form 
                    className="border-2 border-blue-700 w-70 h-80 rounded-2xl flex flex-col gap-3 items-center justify-start py-4"
                    onSubmit={handleSubmit}
                    >
                        <p className="text-green-600 font-bold leading-relaxed">Register here !</p>

                        <input 
                        className="h-7 mt-5 w-50 placeholder:text-xs text-xs rounded-2xl px-2 focus:outline-none focus:border-green-600 border-2 border-black " 
                        type="text" 
                        value={username}
                        placeholder="username or phone" 
                        onChange={(e)=> setUserName(e.target.value)}
                        required/>


                        <input 
                        className="h-7 w-50 placeholder:text-xs text-xs rounded-2xl px-2 focus:outline-none focus:border-green-600 border-2 border-black " 
                        type="email" 
                        value={email}
                        placeholder="email" 
                        onChange={(e)=> setEmail(e.target.value)}
                        required/>

                        <div className="relative w-50">
                                <input
                                className="h-7 w-full placeholder:text-xs text-xs rounded-2xl px-2 pr-8 focus:outline-none focus:border-green-600 border-2 border-black"
                                type="password"
                                ref={passwordRef}
                                value={password1}
                                onChange={eyeChanger}
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

                        <div className="relative w-50">
                                <input
                                className="h-7 w-full placeholder:text-xs text-xs rounded-2xl px-2 pr-8 focus:outline-none focus:border-green-600 border-2 border-black"
                                type="password"
                                value={password}
                                ref={passwordRef2}
                                onChange={eyeChanger2}
                                placeholder="confirm password" 
                                required
                                />

                                <button
                                type="button"
                                className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-600 hover:text-black"
                                onClick={hideShow2}
                                ref={eyeRef2}
                                >
                                🙈
                                </button>

                        </div>
                       <button
                        type={isAvailable &&  passLenCheck ? "submit" : "button"}
                        className={`border-2 font-bold py-1 w-3/4 rounded-xl text-sm ${
                          isAvailable && passLenCheck
                            ? "border-blue-600 bg-blue-600 text-white"
                            : "border-blue-200 bg-blue-200 text-white"
                        }`}
                      >
                        Create Account
                      </button>
                      {
                        password.trim()!==password1.trim() ? <p className="text-red-500 text-xs">Password didn't match with each other</p>:""
                      }
                      {
                        password.length >=4 || password.length <= 7 ? password1.length < 8 ? <p className="text-red-500 text-xs">Password must be atleast of 8 character</p>:"":""
                      }
                    </form>
                </div>

                <div className="h-full w-2/3" id="img">
                  <img src={logWall} className="h-full w-full object-cover object-center" alt="authentication image" />
                </div>
            </section>

            <div className={`h-120 w-screen justify-center items-center bg-gray-300 ${signedMsgBox}`}>
              <p className="text-3xl font-semibold text-blue-700">{signMsg}<span className="loading"></span> </p> 
            </div>

        </main>
        </>
    )
}

export default Login;