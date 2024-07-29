import { Navigate, Route, Routes } from "react-router-dom"
import Header from "./components/Home/Header"
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { UserContext, useUser } from "./context/UserContext";
import { useContext } from "react";

function App() {
  const {user,setUser} = useContext(UserContext);
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-gray-900">
      <Header />
      <Routes>
            <Route path='/' element={user?<Dashboard/>:<Login/>} />
            <Route path='/login' element={user?<Dashboard/>:<Login/>} />
            <Route path='/register' element={user?<Dashboard/>:<Register/>} />
            <Route path='*' element={<Navigate to="/"/>} />
        </Routes>
    </div>
  )
}

export default App
