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
                throw error
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
        navigate('/')
    }
  return (
    <nav>
        {user?(
            <ul>
                <Link to={"/home"}> <li> Home</li></Link>
                <Link to={"/newpost"}> <li> New post</li></Link>
                <button onClick={handleLogout}>Logout</button>
            </ul>
        ): (
            <ul>

                <Link to={"/signup"}> <li> Signup</li></Link>
                <Link to={"/"}> <li> Login</li></Link>
            </ul>
        )}
    </nav>
  )
}

export default Navbar