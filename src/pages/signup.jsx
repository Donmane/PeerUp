import { useState } from "react";
import { supabase } from "../lib/supabase";
import { Link } from "react-router-dom";
function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");

  const handlesignup = async(e)=>{
    e.preventDefault()
    setLoading(true)
    setError("")
        
    const{error:signupError} = await supabase.auth.signUp({
        email,
        password,
        options:{
            data:{
                username    
            }
        }
    })
    if (signupError) {
        setError(signupError.message)
        setLoading(false)
        return;
    }
    window.location.href = "/home"

    }

  return(
    <>
    <form onSubmit={handlesignup}>
        <input type="text" placeholder="username" value={username} onChange={(e) =>setUsername(e.target.value)}/>
        <input type="email" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <button disabled={loading}>{loading ? "Signing up ....":"Sign up"}</button>
        {error && <p>{error}</p>}
    </form>
    <Link to="/">
    Already have an account ? Login here
    </Link>
    </>
  );
}

export default Signup;
