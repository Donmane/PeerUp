import Navbar from "../components/Navbar"
import {useState, useEffect} from "react"
import { supabase } from "../lib/supabase"
function Home() {
  const [post,setPost] = useState([])
  const [search,setSearch] = useState("")
  const [user,setUser] = useState(null)
  useEffect(()=>{
    const getUser = async () => {
      const {data,error} = await supabase.auth.getUser()
      if(error){
        console.log(error);
        
      }
      if (data.user) {
        setUser(data.user)
      }
    }
    getUser()
  },[])

  useEffect(()=>{
    const getPost = async () => {
      const {data,error} = await supabase.from('posts').select('*')
      if (error) {
        console.log(error);
      }
      if (data) {
        setPost(data)
      }
    }
    getPost()
  },[])

  const handleDelete = async(id) =>{
    const {error} = await supabase.from('posts').delete().eq('id',id)
    if (error) {
      console.log(error);
      
    }else{
      window.location.href = "/home"
    }
  }
  return (
    <>
    <Navbar/>
    <main className="min-h-[calc(100vh-4rem)] bg-brand-bg flex flex-col items-center px-4 py-16 select-none relative overflow-hidden gap-10">
      {/* Decorative ambient glowing backdrops to match Login/Signup */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-48 -left-48 w-96 h-96 bg-brand-amber/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-48 -right-48 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-2xl z-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-brand-text mb-2">Find your study tribe.</h1>
      </div>
      <div className="w-full max-w-2xl z-10">
        <input type="text" placeholder="Search For Topic" value={search} onChange={(e)=>setSearch(e.target.value)} className="w-full px-4 py-3.5 bg-brand-bg/50 border border-brand-text/10 rounded-2xl text-brand-text placeholder-brand-muted/30 focus:outline-none focus:border-brand-amber focus:ring-2 focus:ring-brand-amber/25 transition-all duration-200" />
      </div>
      <div className="w-full max-w-2xl z-10 flex flex-col gap-6">
        {post.filter(p => p.subject.toLowerCase().includes(search.toLocaleLowerCase())).map((post)=>(
          <div key={post.id} className="bg-brand-card/80 backdrop-blur-md rounded-3xl border border-brand-text/5 p-8 shadow-2xl shadow-black/45 hover:border-brand-text/10 transition-colors duration-150">
            <h2 className="text-xl font-bold tracking-tight text-brand-text mb-2">{post.subject}</h2>
            <p className="text-sm text-brand-muted leading-relaxed whitespace-pre-wrap mb-6">{post.description}</p>
            <a href={`mailto:${post.email}`} className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-brand-amber to-brand-orange hover:from-brand-amber/95 hover:to-brand-orange/95 text-brand-bg font-bold rounded-2xl transition-all duration-200 transform active:scale-[0.98] text-xs shadow-md shadow-brand-amber/5">Contact</a>
            {user && post.user_id === user.id && <button onClick={()=>handleDelete(post.id)} className="inline-flex items-center justify-center px-4 py-2 border border-brand-error border-opacity-30 hover:border-opacity-100 bg-transparent text-brand-error hover:bg-brand-error hover:bg-opacity-10 font-bold rounded-2xl text-xs transition-all duration-200 ml-2">Delete</button>}

          </div>
        ))}
      </div>
    </main>
    </>

  )
}

export default Home