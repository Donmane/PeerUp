import {useState, useEffect} from "react"
import { useNavigate, Link } from "react-router-dom"
import { supabase } from "../lib/supabase"
function Navbar() {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()
    useEffect(()=>{
        const getuser = async () => {
            const {data,error} = await supabase.auth.getUser()
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
        navigate('/')
    }
  return (
    <nav>
        {user?(
            <ul>
                <li>Home</li>
                <li>Newpost</li>
                <button>Logout</button>
            </ul>
        ): (
            <ul>
            <li>Login</li>
            <li>Signup</li>
            </ul>
        )}
    </nav>
  )
}

export default Navbar