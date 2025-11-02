import { NavLink } from "react-router-dom";
import '../Nav.css'
import '../MediaQueries/Nav.css'
import { JwtTokenContext } from "../Context/JwtToken";
import { useContext } from "react";

const Nav=()=>{
    const {token}=useContext(JwtTokenContext)
    return (
        <>
        <nav className="nav relative">
            <NavLink to="/" className={`flex gap-1  items-center text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent`}>TCG's <div className="text-sm mt-2">blogs</div></NavLink>

           <section className="w-3/5 flex justify-around pr-2" id="big">
                <NavLink to="/blogs"  className={({isActive})=> `active:scale-75 active:text-cyan-500 ${isActive ? "border-b-red-600 border-b-2":"hover:text-blue-500"}`}>Blogs</NavLink>
                
                {
                    token ?
                    <>
                        <NavLink to="/LearningZone"  className={({isActive})=> `active:scale-75 active:text-cyan-500 ${isActive ? "border-b-red-600 border-b-2":"hover:text-green-400"}`}>Learning Zone</NavLink>
                        <NavLink to="/postBlog"  className={({isActive})=> `active:scale-75 active:text-cyan-500 ${isActive ? "border-b-red-600 border-b-2":"hover:text-blue-500"}`}>Post Blog</NavLink>
                        <NavLink to="/profile"  className={({isActive})=> `active:scale-75 active:text-green-700 ${isActive ? "border-b-red-600 border-b-2":"hover:text-green-400"}`}>Profile</NavLink>
                    </>
                    : 
                    <div className="-mr-30 flex gap-7">
                        <NavLink to="/auth/login" className={({isActive})=> isActive ?"border-b-red-600 border-b-2":"hover:text-green-400"}>Log In</NavLink>
                        <NavLink to="/auth/signup"  className={`border-1 px-2 rounded-sm hover:border-green-500 hover:bg-black hover:text-green-400 transition-all text-black border-green-400 bg-green-400`}>✧ Register</NavLink>
                    </div>
                }
           </section>
           <button onClick={()=> document.getElementById('small').style.display='flex'} id="ham">
                <i class="fa fa-bars"></i>
           </button>
           <section className="absolute h-screen text-red-600 shadow-md shadow-gray-400 w-1/2 backdrop-blur-2xl top-0 right-0 flex flex-col justify-evenly items-center text-xl" id="small">
                <NavLink to="/blogs"  className={({isActive})=> `active:scale-75 active:text-cyan-500 ${isActive ? "border-b-red-600 border-b-2":"hover:text-blue-500"}`}>Blogs</NavLink>
                
                {
                    token ?
                    <>
                        <NavLink to="/LearningZone"  className={({isActive})=> `active:scale-75 active:text-cyan-500 ${isActive ? "border-b-red-600 border-b-2":"hover:text-green-400"}`}>Learning Zone</NavLink>
                        <NavLink to="/postBlog"  className={({isActive})=> `active:scale-75 active:text-cyan-500 ${isActive ? "border-b-red-600 border-b-2":"hover:text-blue-500"}`}>Post Blog</NavLink>
                        <NavLink to="/profile"  className={({isActive})=> `active:scale-75 active:text-green-700 ${isActive ? "border-b-red-600 border-b-2":"hover:text-green-400"}`}>Profile</NavLink>
                    </>
                    : 
                    <div className="-mr-30 flex gap-7" id="log-reg">
                        <NavLink to="/auth/login" className={({isActive})=> isActive ?"border-b-red-600 border-b-2":"hover:text-green-400"}>Log In</NavLink>
                        <NavLink to="/auth/signup"  className={`border-1 px-2 rounded-sm hover:border-green-500 hover:bg-black hover:text-green-400 transition-all text-black border-green-400 bg-green-400`}>✧ Register</NavLink>
                    </div>
                }
                <button className="hover:text-red-700" onClick={()=> document.getElementById('small').style.display="none"}>
                   Close <i class="fa fa-times"></i>
                </button>
           </section>
        </nav>
        </>
    )
}

export default Nav;
