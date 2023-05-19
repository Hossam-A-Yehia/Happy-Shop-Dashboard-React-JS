import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";

import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";
import Complaints from "./pages/complaints/Complaints";
import Comments from "./pages/comments/Comments";
import Loader from "./pages/loader/Loader";
import AOS from "aos"

import "aos/dist/aos.css"
import { useEffect } from "react";

function App() {
  const { userAccount } = useSelector((state) => state.user);

  useEffect(() => {
    AOS.init({ duration: 1000 });

  }, [])
  return (
    <BrowserRouter>
      {userAccount && <Topbar />}
      <div className="d-flex">
        {userAccount && <Sidebar />}
        <Routes>
          <Route path="/" exact element={userAccount ? <Home /> : <Login />}/>
          <Route path="/login"  element={userAccount ? <Home /> : <Login />}/>
          <Route path="/users" element={userAccount ? <UserList />:<Login/>} />
          <Route path="/user/:userId" element={userAccount ? <User />:<Login/>} />
          <Route path="/newUser" element={userAccount ? <NewUser />:<Login/>} />
          <Route path="/products" element={userAccount ? <ProductList /> : <Login/>} />
          <Route path="/product/:productId" element={userAccount ? <Product />:<Login/>} />
          <Route path="/newproduct" element={userAccount ? <NewProduct />:<Login/>} />
          <Route path="/complaints" element={userAccount ? <Complaints />:<Login/>} />
          <Route path="/comments" element={userAccount ? <Comments />:<Login/>} />
          <Route path="/Load" element={<Loader/>} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
