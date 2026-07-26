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
    <main>
      <div>
        <h1>Find your study tribe.</h1>
      </div>
      <div>
        <input type="text" placeholder="Search For Topic" value={search} onChange={(e)=>setSearch(e.target.value)} />
      </div>
      <div>
        {post.filter(p => p.subject.toLowerCase().includes(search.toLocaleLowerCase())).map((post)=>(
          <div key={post.id}>
            <h2>{post.subject}</h2>
            <p>{post.description}</p>
            <a href={`mailto:${post.email}`}>Contact</a>
            {user && post.user_id === user.id && <button onClick={()=>handleDelete(post.id)}>Delete</button>}

          </div>
        ))}
      </div>
    </main>
    </>

  )
}

export default Home