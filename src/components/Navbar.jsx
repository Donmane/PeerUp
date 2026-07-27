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
    <nav>
        <Link to={"/home"}>Peerup</Link>
        {user?(
            <ul>
                <li><Link to={"/home"}>Home</Link></li>
                <li><Link to={"/newpost"}> New post</Link></li>
                <button onClick={handleLogout}>Logout</button>
            </ul>
        ): (
            <nav>

            <Link to={"/home"}>Peerup</Link>
            <ul>
                <li><Link to={"/signup"}> Signup</Link></li>
                <li><Link to={"/"}> Login</Link></li>
            </ul>
                        </nav>

        )}
    </nav>
  )
}

export default Navbar