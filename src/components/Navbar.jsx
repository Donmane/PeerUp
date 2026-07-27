import {useState, useEffect} from "react"
import { useNavigate, Link } from "react-router-dom"
import { supabase } from "../lib/supabase"
function Navbar() {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()
    useEffect(()=>{
        const getuser = async () => {
            const {data,error} = await supabase.auth.getUser()
            if (error) {
                console.log(error);
                 
            }
            if (data.user) {
                setUser(data.user)
            }
            console.log(data)
        }
        getuser()
    },[])

    const handleLogout = async () =>{
        await supabase.auth.signOut()
        setUser(null)
        navigate('/home')
    }
  return (
    <nav className="relative flex items-center justify-center h-16 border-b border-brand-card bg-brand-bg text-brand-text px-6 select-none">
        <Link to={"/home"} className="absolute left-6 text-base font-semibold tracking-tight text-brand-text hover:text-brand-amber transition-colors duration-150">Peerup</Link>
        {user?(
            <ul className="flex items-center justify-center gap-8">
                <li><Link to={"/home"} className="text-sm font-medium text-brand-muted hover:text-brand-text transition-colors duration-150">Home</Link></li>
                <li><Link to={"/newpost"} className="text-sm font-medium text-brand-muted hover:text-brand-text transition-colors duration-150"> New post</Link></li>
                <button onClick={handleLogout} className="absolute right-6 px-3 py-1.5 border border-brand-card hover:border-brand-muted bg-transparent text-brand-text hover:bg-brand-card rounded-md text-sm font-medium transition-colors duration-150">Logout</button>
            </ul>
        ): (
            <nav className="absolute right-6 flex items-center gap-4">

            <Link to={"/home"} className="hidden">Peerup</Link>
            <ul className="flex items-center gap-4">
                <li><Link to={"/signup"} className="text-sm font-medium text-brand-muted hover:text-brand-text transition-colors duration-150"> Signup</Link></li>
                <li><Link to={"/"} className="px-3 py-1.5 border border-brand-card hover:border-brand-muted bg-transparent text-brand-text hover:bg-brand-card rounded-md text-sm font-medium transition-colors duration-150"> Login</Link></li>
            </ul>
                        </nav>

        )}
    </nav>
  )
}

export default Navbar