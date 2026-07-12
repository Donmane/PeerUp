import { supabase } from "../lib/supabase";
import { useState } from "react";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error: LoginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (LoginError) {
      setError(LoginError.message);
      setLoading(false);
      return;
    }
    window.location.href = "/home";
    setLoading(false);
  };
  return (
    <>
      <form onSubmit={handleLogin}> 
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button disabled={loading}>{loading ? "Loading..." : "Login"}</button>

        {error && <p>{error}</p>}
      </form>
    </>
  );
}

export default Login;
