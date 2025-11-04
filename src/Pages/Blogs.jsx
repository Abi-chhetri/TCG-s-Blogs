import { useContext, useEffect, useState } from "react";
import { JwtTokenContext } from "../Context/JwtToken";
import { BlogContext } from "../Context/BlogContext";
import { UserContext } from "../Context/UserContext";
import '../Signup.css'
import { useNavigate } from "react-router-dom";
import '../MediaQueries/Blogs.css'

const Blogs = () => {
  const { blogs, setBlogs, userBlogChanged, setUserBlogChanged} = useContext(BlogContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {newsUpdate, setNewsUpdate }=useContext(UserContext);
  const { token ,setToken, setExpiration} = useContext(JwtTokenContext);
  const [category,setCategory]=useState("ALL");
  const [filteredCat,setFilteredCat]=useState([])
  const [suctext,setSucText]=useState("")
  const navigate=useNavigate()

  useEffect(()=>{
    const filtered= blogs.filter((blog)=>(blog.genre.toLowerCase().trim()===category.toLowerCase().trim()))
    setFilteredCat([...filtered].slice().reverse())
  },[category])

  async function subscribeNews() {
    try{
      const response = await fetch("https://blog-backend-production-7482.up.railway.app/blog/users/newsUpdate",{
        method:"PUT",
        headers:{
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
        }
      });

      const responseText=await response.text();
      console.log(responseText)
      if(response.status===200){
        setNewsUpdate((prev)=> !prev)
        setSucText(responseText)
      }

      setTimeout(()=> setSucText(""),1500)
    }
    catch(err){
      console.error("something went wrong while update newsUpdate state ",err)
    }
  }

  useEffect(() => {
        async function fetchBlogs() {
            if (!token) {
                setError("No authentication token available");
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const response = await fetch("https://blog-backend-production-7482.up.railway.app/blog/blogs/all", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });

                if(response.status===401){
                  navigate("/auth/login")
                  setToken("")
                  localStorage.removeItem('authToken');
                  setExpiration(true)
                }

                // ✅ Get the response text first
                const responseText = await response.text();
                
                // ✅ Try to parse as JSON regardless of status code
                try {
                    const jsonData = JSON.parse(responseText);
                    console.log("✅ Success! Fetched", jsonData.length, "blogs");
                    setBlogs(jsonData);
                } catch (parseError) {
                    console.error("Failed to parse JSON:", parseError);
                    throw new Error(`Invalid JSON response: ${responseText.substring(0, 100)}`);
                }
            } catch (err) {
                console.error("❌ Error fetching blogs:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
      if(token && blogs.length==0){
        fetchBlogs()
      }

      if(userBlogChanged && token.length >0){
        fetchBlogs();
        setUserBlogChanged(false)
      }

  },[token, userBlogChanged]);


  if (loading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <div className="text-2xl">Loading blogs <span className="loading"></span></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center">
        <div className="text-2xl text-red-500 mb-4">Error: {error}</div>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }


  return (
    <>
    {suctext.length ? <p className=" text-center bg-green-700 text-white">{suctext}</p>:""}
    <div className={`min-h-full w-full p-8 ${token ? "":`blur-xs`}`}>
      <div className="mb-8 flex justify-between items-center" id="catSec">
        <span className="text-4xl font-bold w-max" id="head">{category} Blogs</span>
        <button
          onClick={()=> subscribeNews()}
          className="w-max border-1 border-red-600 p-1 font-bold rounded-xs bg-red-600 text-white hover:text-white-700 hover:scale-102 active:bg-gradient-to-r from-cyan-400 via-indigo-600 to-blue-500 active:scale-95 hover:bg-red-700">
            {newsUpdate===true ? "UnSubscribe":"Subscribe"} for New Blogs Update
        </button>
      </div>
     <div className="flex gap-2 items-center w-max pb-4">
        <label htmlFor="category">Category</label>
        <select name="blogs_category" id="category" defaultValue="ALL" value={category} onChange={(e)=>setCategory(e.target.value)}>
            <option value="ALL">ALL</option>
            <option value="AI">AI</option>
            <option value="Business">Business</option>
            <option value="Cloud Computing">Cloud Computing</option>
            <option value="Business Idea and Tips">Business Tips</option>
            <option value="Cybersecurity">Cybersecurity</option>
            <option value="DevOps">DevOps</option>
            <option value="Java">Java</option>
            <option value="Python">Python</option>
            <option value="Go">Go</option>
            <option value="Rust">Rust</option>
            <option value="Web Development">Web Development</option>
            <option value="Mobile Development">Mobile Development</option>
            <option value="Data Science">Data Science</option>
            <option value=" Machine Learning"> Machine Learning</option>
            <option value="Gadgets">Gadgets</option>
            <option value="Networking">Networking</option>
            <option value="Hardware">Hardware</option>
            <option value="VR">VR</option>
            <option value="IoT">IoT</option>
            <option value="Robotics">Robotics</option>
            <option value="AR">AR</option>
            <option value="Blockchain">Blockchain</option>
            <option value="Open Source">Open Source</option>
            <option value="SaaS">SaaS</option>
            <option value="Public Safety">Public Safety</option>
            <option value="Surveillance">Surveillance</option>
            <option value="Energy">Energy</option>
            <option value="Brain-Computer Interface">Brain-Computer Interface</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Quantum Computing">Quantum Computing</option>
            <option value="Edge Computing">Edge Computing</option>
            <option value="Automation Tools ">Automation Tools</option>
            <option value="Productivity Tools">Productivity Tools</option>
            <option value="Collaboration Platforms">Collaboration Platforms</option>
            <option value=" Gaming Tech"> Gaming Tech</option>
            <option value="Audio/Video Tech">Audio/Video Tech</option>
            <option value="Fintech">Fintech</option>
            <option value="Education Tech">Education Tech</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Biology">Biology</option>
            <option value="History">History</option>
            <option value="Law">Law</option>
            <option value="Astrology">Astrology</option>
            <option value="Politics">Politics</option>
            <option value=" Evolution of Human"> Evolution of Human</option>
        </select>
     </div>

     {
      category.toLowerCase().trim()==="all" ?
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 overflow-hidden">
                {[...blogs].reverse().map((blog) =>(
                    <div 
                      key={blog.id} 
                      className="border rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
                    >
                      <div className="text-sm text-gray-500 mb-2">{blog.genre}</div>
                      <h2 className="text-xl font-semibold mb-2 text-gray-900 hover:text-blue-600 transition-colors duration-300">{blog.title}</h2>
                      { /*
                        blog.image_url ? 
                          <div className="h-max w-full overflow-hidden flex justify-center mb-5">
                               <img 
                                  src={blog.image_url} 
                                  alt={blog.genre} 
                                  className="h-80 w-full object-cover object-center"
                                  onError={(e) => (e.target.style.display = 'none')}/>
                          </div>
                          :
                          <>
                          </>
                      */}
                      <p className="text-gray-700 whitespace-pre-line text-justify">{blog.content.replace(/(\d+)\.\s/g, '\n$1. ')}</p>
                      <div className="mt-4 text-sm text-gray-400">{blog.dateTime}</div>
                    </div>
                ))}
        </div>
        :
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
                {filteredCat.map((blog) =>(
                    <div 
                      key={blog.id} 
                      className="border rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
                    >
                      <div className="text-sm text-gray-500 mb-2">{blog.genre}</div>
                      <h2 className="text-2xl font-semibold mb-2 text-gray-900 hover:text-blue-600 transition-colors duration-300">{blog.title}</h2>
                     {
                        blog.image_url ? 
                          <div className="h-max w-full overflow-hidden flex justify-center mb-5">
                               <img 
                                  src={blog.image_url} 
                                  alt={blog.genre} 
                                  className="h-80 w-full object-cover object-center"
                                  onError={(e) => (e.target.style.display = 'none')}/>
                          </div>
                          :
                          <>
                          </>
                      }
                      <p className="text-gray-700 whitespace-pre-line text-justify">{blog.content.replace(/(\d+)\.\s/g, '\n$1. ')}</p>
                      <div className="mt-4 text-sm text-gray-400">{blog.dateTime}</div>
                    </div>
                ))}
        </div>
     }
  </div>
  {
    token ? 

      <></>
    :  
      <div className="min-w-screen min-h-60 font-bold text-5xl text-blue-500 flex justify-center items-start">
          <p className=" border-4 border-blue-400 w-max p-2 rounded-xl">Please Login to Read Blogs</p>
      </div>
  }
  </>
  );
}

export default Blogs;
