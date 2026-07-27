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
      <form onSubmit={handlepost} className="min-h-[calc(100vh-4rem)] bg-brand-bg flex flex-col justify-center items-center px-4 py-12 select-none relative overflow-hidden">
        {/* Decorative ambient glowing backdrops to match Login/Signup */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-48 -left-48 w-96 h-96 bg-brand-amber/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-48 -right-48 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl"></div>
        </div>

        <div className="w-full max-w-md z-10">
          <div className="flex flex-col items-center mb-8 text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-brand-text mb-2">
              New Post
            </h1>
            <p className="text-sm text-brand-muted">
              Share your study request with the <span className="font-semibold text-brand-amber">PeerUp</span> tribe.
            </p>
          </div>

          <div className="bg-brand-card/80 backdrop-blur-md rounded-3xl border border-brand-text/5 p-8 shadow-2xl shadow-black/45 flex flex-col gap-6">
            <div>
              <label className="block text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2">
                Subject
              </label>
              <input
                type="text"
                placeholder="What subject are you studying?"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-3.5 bg-brand-bg/50 border border-brand-text/10 rounded-2xl text-brand-text placeholder-brand-muted/30 focus:outline-none focus:border-brand-amber focus:ring-2 focus:ring-brand-amber/25 transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2">
                Description
              </label>
              <textarea
                placeholder="Describe what you need help with..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3.5 bg-brand-bg/50 border border-brand-text/10 rounded-2xl text-brand-text placeholder-brand-muted/30 focus:outline-none focus:border-brand-amber focus:ring-2 focus:ring-brand-amber/25 transition-all duration-200 min-h-[160px] resize-y"
              />
            </div>

            <button
              disabled={loading}
              className="w-full py-4 px-4 bg-gradient-to-r from-brand-amber to-brand-orange hover:from-brand-amber/95 hover:to-brand-orange/95 text-brand-bg font-bold rounded-2xl transition-all duration-200 transform active:scale-[0.98] shadow-lg shadow-brand-amber/10 focus:outline-none focus:ring-2 focus:ring-brand-amber/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
        {error && <p className="text-sm text-brand-error mt-4 z-10">{error.message}</p>}
      </form>
    </>
  );
}

export default Newpost;
