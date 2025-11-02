import './App.css'
import Nav from './Components/Nav'
import Footer from './Components/Footer'
import  Blogs  from './Pages/Blogs'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import {Routes, Route, useNavigate} from "react-router-dom"
import { JwtTokenContext } from './Context/JwtToken'
import { Profile } from './Pages/Profile'
import { useContext, useEffect } from 'react'
import { UserContext } from './Context/UserContext'
import { ChangePassword } from './Pages/ChangePassword'
import { ChangeUserName } from './Pages/ChangeUserName'
import { PostBlog } from './Pages/PostBlog'
import { BlogContext } from './Context/BlogContext'
import { UpdateBlog } from './Pages/UpdateBlog'
import { LearningZone } from './Pages/Learning'
import { ForgotPassword } from './Pages/ForgotPassword'
import { Otp } from './Pages/Otp'


function App() {

  const { token, setToken, setExpiration }=useContext(JwtTokenContext);
  const { setUserName, setEmail, setCreatedDate, setUserBlog, setIsActive, setNewsUpdate}=useContext(UserContext)
  const {userBlogChanged }=useContext(BlogContext)
  const navigate=useNavigate()

  useEffect(()=>{

    if(!token) return;

    async function fetchUser(){
      try{
        const response=await fetch('https://blog-backend-production-7482.up.railway.app/blog/users/getUserDetails',{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        if(response.status===401){
            navigate("/auth/login")
            setToken("")
            localStorage.removeItem('authToken');
            setExpiration(true)
        }

        const userData = await response.json();
 
        setEmail(userData.email)
        setUserName(userData.userName)
        setUserBlog(userData.userBlog)
        setCreatedDate(userData.userCreatedDate)
        setNewsUpdate(userData.newsUpdate)

        if(token) {
          setIsActive("On");
        }
        else{
          setIsActive("Off")
        }

      }
      catch(err){
        console.error("Error while fetching user Details",err);
      }
    }

  
    fetchUser()
    
    
  },[token, userBlogChanged])

  return (
    <>
        <Nav/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />}/>
          <Route path="/auth/login" element={<Login />}/>
          <Route path="/auth/signup" element={<Signup />}/>
          <Route path="/auth/resetPassword" element={<ForgotPassword />}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path="/profile/changePassword" element={<ChangePassword />}/>
          <Route path="/profile/changeUserName" element={<ChangeUserName />}/>
          <Route path="/postBlog" element={<PostBlog />}/>
          <Route path="/updateBlog" element={<UpdateBlog />}/>
          <Route path="/learningZone" element={<LearningZone />}/>
          <Route path="/forgotPassword" element={<ForgotPassword />}/>
          <Route path="/otp" element={<Otp />}/>
        </Routes>
        <Footer/>
    </>
  )
}

export default App
