import blogImg from '../assets/GeminiGenerated.png'
import tech from '../assets/tech.webp'
import learn from '../assets/learn.avif'
import nebula from '../assets/nebula.mp4'
import { NavLink } from 'react-router-dom'
import '../MediaQueries/Home.css'
import '../index.css'
import { JwtTokenContext } from '../Context/JwtToken'
import { useContext } from 'react'

const Home=()=>{

    const {token}=useContext(JwtTokenContext)
    return (
        <>
        <main>
            <header className="h-auto w-full bg-gradient-to-b from-gray-900 to-black text-white py-2">
                <p className="flex mt-3 items-center justify-center text-6xl font-medium text-purple-300 hover:text-cyan-600 transition" id='title'>Learn. Build. Grow</p>
                <section className="mt-12 w-full h-max flex px-5 gap-20 mb-5" id='hero-img'>
                    <div className="h-full w-full flex flex-col text-justify gap-2">
                        <div className='text-a font-thin'>
                            <p className='font-sans font-bold text-sm text-gray-500 tracking-wide line-clamp-3' id='slog'>
                                Tech blog that fuels your coding journey ... 
                            </p>
                        </div>
                        <p className="text-4xl text-slate-100 font-mono font-medium line-clamp-4" id='slog1'>TCG's Blogs,</p>
                        <p className="text-3xl text-slate-100 line-clamp-4" id='slog1'>Always keep up to date for tech-eager readers.</p>
                        <div className='text-sm mt-2 font-thin' id='listed-text'>
                            <ul className="list-[circle]  list-inside flex gap-4 flex-col text-gray-300 leading-relaxed space-y-3 line-clamp-3">
                                <li>Explore blogs made for developers who wants to be up to date about thier programming languages updates and tech updates.</li>
                                <li>Explore Learning zone made for newbie devs or who is still in the college. They can learn programming language from here.</li>
                                <li>Post blogs Anonymously.</li>
                            </ul>
                        </div>

                        <div className='flex gap-10 mt-4' id='blogAd'>
                            <p>1,000+ daily publications. Ready to learn ?</p>
                            {
                                token ? "":<NavLink to="/auth/signup" id='getStarted'  className={`-mt-2 font-bold border-2 p-1 hover:bg-green-800 hover:font-normal hover:border-green-700 rounded-sm transition-all`}>Get Started &#8594;</NavLink>
                            }
                        </div>
                    </div>

                    <div className= "h-full w-full flex flex-col flex-wrap justify-around gap-4">
                        <div className='flex justify-evenly' id='top-div'>
                            <img className="h-30 w-60 rounded-2xl opacity-60 hover:opacity-100 hover:scale-105 transition-transform" id='top' src={tech} alt="search tech image in google"/>
                            <img className="h-30 w-60 rounded-2xl opacity-60 hover:opacity-100 hover:scale-105 transition-transform" id='top' src={learn} alt="learning tech image"/>
                        </div>
                        <img className="h-60 w-120 rounded-2xl ml-10 opacity-60 hover:opacity-100 hover:scale-105 transition-transform" id='bottom'  src={blogImg} alt="our blogs photo"/>
                    </div>
                </section>


                <section className='relative flex min-h-96 p-10 justify-around items-center flex-col pt-20'>
                    <video 
                        className='absolute top-0 left-0 h-full w-full object-cover blur-sm' 
                        src={nebula} 
                        autoPlay 
                        muted 
                        loop 
                        playsInline
                    />
                    
                    <div className='absolute inset-0 bg-black/20'></div>
                    
                    <div className='flex flex-col gap-4'> 
                        <h1 className='z-10 flex place-content-center font-mono text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-indigo-200 to-indigo-600' id='bigText'>
                        ENJOY THOUSANDS OF BLOGS
                        </h1>
                        <h1 className='z-10 flex place-content-center font-mono text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r to-cyan-300 via-indigo-200 from-indigo-600' id='bigText'>
                            AT YOUR FINGERTIPS
                        </h1>
                    </div>
                
                </section>
                
            </header>
        </main>
        </>
    )
}

export default Home;