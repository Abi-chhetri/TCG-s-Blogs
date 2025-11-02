import { NavLink } from "react-router-dom";
import ai from '../assets/ai.png'
import '../MediaQueries/footer.css'

const Footer=()=>{
    let date=(new Date().getFullYear()).toString()
    return (
        <>
        <footer className="h-max absolute w-screen bg-black text-white">
            <hr />
            <div className="px-10 flex justify-between pt-2">
                <p id="copy">&copy; {`${date} TCG's Blogs`}</p>
                <div className="flex gap-4 text-sm" id="copy">
                    <NavLink to='mailto:tcgs016@gmail.com'>Email</NavLink>
                    <p>|</p>
                    <NavLink to='/'>Privacy policy</NavLink>
                    <p>|</p>
                    <NavLink to='/'>Terms</NavLink>
                </div>
            </div>
            <div className="flex mt-10 place-content-center">
                ✧ ✧ ✧ ✧
            </div>
            <div className="flex flex-col justify-center items-center mt-6 gap-6">
                <img src={ai} id="img" className="h-20 w-70 rounded-2xl bg-gradient-to-r p-1 from-cyan-400 via-blue-500 to-indigo-600" alt="misteral ai logo" />
                <p id="copy">Powered by Mistral AI - Connecting developers with quality content.</p>
                <p className="pb-4" id="copy">Designed and Developed by Abi Chhetri</p>
            </div>

        </footer>
        </>
    )
}

export default Footer;