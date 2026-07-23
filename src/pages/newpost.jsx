import { supabase } from "../lib/supabase";
import { useState } from "react";
import Navbar from "../components/Navbar";
function Newpost() {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handlepost = async(e) => {
  e.preventDefault()
    setLoading(true)
    setError("")
    const {data: {user}} = await supabase.auth.getUser()
    const {error: postError} = await supabase.from('posts').insert({
      subject: subject,
      description : description,
      email : user.email,
      user_id : user.id,
    })
    if (postError) {
      setError(postError.message)
      setLoading(false)
    }else{
      setSubject("")
      setDescription("")
      window.location.href = "/home"
    }
  }
  return (
    <>
      <Navbar />
      <form onSubmit={handlepost}>
        <h1>New Posts</h1>
        <div>
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <textarea
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
        {error && <p>{error.message}</p>}
      </form>
    </>
  );
}

export default Newpost;
