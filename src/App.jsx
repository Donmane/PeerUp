import './index.css'
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home"
import Signup from './pages/signup';
import Newpost from './pages/newpost';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/newpost' element={<Newpost/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App