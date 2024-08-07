import { Navigate, Route, Routes } from "react-router-dom"
import Header from "./components/Home/Header"
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Payment from "./pages/Payment";
import Thankyou from "./pages/Thankyou";
import { UserContext } from "./context/UserContext";
import { useContext } from "react";
import Checkout from "./pages/Checkout";
import AdminDashboard from "./pages/AdminDashboard";
import ManagePlans from "./pages/ManagePlans";
import ManageUsers from "./pages/ManageUsers";
import ManagePurchase from "./pages/ManagePurchase";
import ManageQueries from "./pages/ManageQueries";

function App() {
  const {user} = useContext(UserContext);
  console.log(user);
  return (
    <div className="bg-neutral-100 h-full w-full">
      <Header />
      <Routes>
            <Route
              path="/admin"
              element={
                user?.role === "ADMIN" ? (
                  <AdminDashboard />
                ) : (
                  <Login />
                )
              }
            />
            <Route path='/' element={user?<Dashboard/>:<Login/>} />
            <Route path='/login' element={user?<Dashboard/>:<Login/>} />
            <Route path='/register' element={user?<Dashboard/>:<Register/>} />
            <Route path='/products' element={user?<Products />:<Login/>} />
            <Route path='/payment' element={user?<Payment />:<Login/>} />
            <Route path='/thankyou' element={user?<Thankyou />:<Login/>} />
            <Route path='*' element={<Navigate to="/"/>} />
            <Route path="/checkout" element={user?<Checkout />:<Login/>} />
            <Route path="/manageplans" element={user?.role==='ADMIN'?<ManagePlans />:<Login/>} />
            <Route path="/manageusers" element={user?.role==='ADMIN'?<ManageUsers />:<Login/>} />
            <Route path="/managepurchase" element={user?.role==='ADMIN'?<ManagePurchase />:<Login/>} />
            <Route path="/managequeries" element={user?.role==='ADMIN'?<ManageQueries />:<Login/>} />
        </Routes>
    </div>
  )
}

export default App
