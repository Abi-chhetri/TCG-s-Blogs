import { useContext, useState, useEffect } from "react"
import { JwtTokenContext } from "../Context/JwtToken"
import '../Signup.css'
import { useNavigate } from "react-router-dom"
import { UserContext } from "../Context/UserContext"
import '../MediaQueries/profile.css'

export const ChangeUserName=()=>{
    const {token}=useContext(JwtTokenContext)
    const {setUserName}=useContext(UserContext)
    const [userNameBox,setUserNameBox]=useState('')
    const [userNameBox1,setUserNameBox1]=useState('')
    const [load,setLoad]=useState(false)
    const [same,setSame]=useState(false)
    const [succText,setSuccText]=useState("")
    const navigate=useNavigate()

    

    const [userNameStatus, setUserNameStatus]=useState("");
    const [isAvailable, setIsAvailable]=useState(false)
    let available;
    useEffect(() => {
        if (userNameBox.length < 1) {
          setUserNameStatus(""); // empty if no username
          return;
        }
    
        let isCancelled = false; // to stop polling on unmount


        (async function checkUsername() {
        try {
            const response = await fetch(
            "https://blog-backend-production-7482.up.railway.app/blog/sign-up/check-userName",
            {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({ userName: userNameBox.trim() }),
            }
            );
            available=await response.text();
            if (!isCancelled) {
            if (available === "true") {
                setIsAvailable(false)
                setUserNameStatus(
                <p className="text-xs text-red-600">username {userNameBox} Not Available</p>
                );
            } else {
                setIsAvailable(true)
                setUserNameStatus(
                <p className="text-xs text-green-700">username {userNameBox} Available</p>
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
    }, [userNameBox]);


    async function changeUserName() {
        setLoad(true)
        try{
            const response=await fetch("https://blog-backend-production-7482.up.railway.app/blog/users/updateUserName",{
                method:"PUT",
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    "userName":userNameBox
                })
            });

            const responseText=await response.text();
            console.log(responseText)

            if(response.ok){
                setLoad(false)
                setSuccText(responseText)
                setUserName(userNameBox)
                setTimeout(()=>{
                    setSuccText("")
                    navigate("/auth/login")
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
            console.error("Error while changing username",err)
        }
        finally{
            setUserNameBox("")
            setUserNameBox1("")
        }
    }

    return (
        <>
        {succText.length ? <p className="p-1 bg-green-700 text-white text-center">{succText}</p>:""}
         <div className="bg-gray-300 p-2">
            <button className="border-2 border-black px-2 active:scale-95" onClick={()=> navigate("/profile")}> ← Back </button>
        </div>
        <div className="h-90 bg-gray-300 min-w-screen flex justify-center items-center">
            {
                load ?
                <div>
                    Changing Username <span className="loading"></span>
                </div>
                :
                <div className="border-2 border-black w-max flex flex-col items-center p-2 gap-4 rounded">
                    {userNameStatus}
                    {same ? <p className="text-red-500">Error : Your Current Username cannot be your next Username.</p>:""}
                    { userNameBox.length < 4 ?<p className="text-xs text-red-500">Username must be of 4 characters or more</p>:""}
                    { userNameBox.trim() === userNameBox1.trim() ? "":<p className="text-xs text-red-500">Username didn't match with each other</p>}
                    <div className="flex gap-2" id="label">
                        <label className="w-45">New Username</label>
                        <input
                        type="text" 
                        placeholder="New Username"  
                        value={userNameBox} 
                        onChange={(e)=>setUserNameBox(e.target.value)}                     
                        className="p-1 outline-none border-1 border-black"/>
                    </div>
                    <div className="flex gap-2" id="label">
                        <label className="w-45">Confirm New Username</label>
                        <input
                        type="text" 
                        placeholder="Confirm Username" 
                        value={userNameBox1} 
                        onChange={(e)=>setUserNameBox1(e.target.value)}
                        className="p-1 outline-none border-1 border-black"/>
                    </div>
                    <button
                    className={`px-2 border-2  w-max text-white rounded ${userNameBox.trim()===userNameBox1.trim() && userNameBox.length > 4 && isAvailable? "bg-blue-500 border-blue-500":"bg-blue-100 border-blue-100"}`}
                    onClick={changeUserName}
                    >
                        Change
                    </button>
                </div>
                
            }
        </div>
        </>
    )
}