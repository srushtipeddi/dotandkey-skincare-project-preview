import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import AddProduct from "./components/Admin/AddProductForm/AddProduct.jsx";
import ShowProduct from "./components/Admin/AllProduct/ShowProduct.jsx";
import EditProduct from "./components/Admin/UpdateProductFrom/EditProduct.jsx";
import Login from "./components/LoginRegi/Login/Login.jsx";
import Registration from "./components/LoginRegi/Registration/Registration.jsx";
import axios from "axios";
import baseUrl from "./BaseUrl/BaseUel.js";
import UserHome from "./components/User/UserHome/UserHome.jsx";
import ProductInfo from "./components/User/ProductInfo/ProductInfo.jsx";
import CartInfo from "./components/User/Cart/CartInfo.jsx";
import CustomerInfo from "./components/User/CustomerInfo/CustomerInfo.jsx";
import OrderHistory from "./components/User/OrderHistory/OrderHistory.jsx";
import Category from "./components/User/Category/Category.jsx";
import Dashboard from "./components/Admin/Dashboard/Dashboard.jsx";
import FormsDemo from "./components/forms/FormsDemo";
import AdminOrders from "./components/Admin/AdminOrders/AdminOrders.jsx";
import InfoPage from "./components/InfoPage/InfoPage";
import OrderConfirmation from "./components/User/OrderConfirmation/OrderConfirmation";
import OrderDetails from "./components/User/OrderDetails/OrderDetails";
import UserProfile from "./components/User/UserProfile/UserProfile";
import AdminLogin from "./components/Admin/AdminLogin/AdminLogin.jsx";
import Footer from "./components/Footer/Footer";
function App() {
  const [changeLoginbtn, setchangeLoginbtn] = useState(false);
  const [userData, setuserData] = useState(() => {
    return JSON.parse(localStorage.getItem("userData") || "null");
  });

  const fetchUserInfo = () => {
    const email = localStorage.getItem("userEmail");

    if (!email) {
      setuserData(null);
      return;
    }

    axios
      .get(`${baseUrl}/getUserNameByEmail/${email}`)
      .then((res) => {
        const user = {
          username: res.data,
          email: email,
          status: JSON.parse(localStorage.getItem("userData") || "{}").status,
        };

        localStorage.setItem("userData", JSON.stringify(user));
        setuserData(user);
      })
      .catch((err) => {
        console.log("Error fetching username", err);
      });
  };

  useEffect(() => {
    fetchUserInfo();
  }, [changeLoginbtn]);

  useEffect(() => {
    const handleLogin = () => {
      fetchUserInfo();
    };

    const handleLogout = () => {
      setuserData(null);
      setchangeLoginbtn(false);
    };

    window.addEventListener("login", handleLogin);
    window.addEventListener("logout", handleLogout);

    fetchUserInfo();

    return () => {
      window.removeEventListener("login", handleLogin);
      window.removeEventListener("logout", handleLogout);
    };
  }, []);

  return (
    <Router>
      <Navbar userdata={userData} changebtn={setchangeLoginbtn} />

      <Routes>
        <Route path="/" element={<UserHome />} />
        <Route path="/form" element={<FormsDemo />} />
        <Route path="/add-products" element={<AddProduct />} />
        <Route path="/show-product" element={<ShowProduct />} />
        <Route path="/updateProduct/:id" element={<EditProduct />} />
        <Route
          path="/login"
          element={<Login changebtn={setchangeLoginbtn} />}
        />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/signup" element={<Registration />} />
        <Route path="/userhome" element={<UserHome />} />
        <Route path="/product-info/:id" element={<ProductInfo />} />
        <Route path="/cart-info" element={<CartInfo />} />
        <Route path="/customer-info/:id" element={<CustomerInfo />} />
        <Route path="/order-history/:email" element={<OrderHistory />} />
        <Route path="/category/:category" element={<Category />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin-orders" element={<AdminOrders />} />
        <Route
          path="/order-confirmation/:orderId"
          element={<OrderConfirmation />}
        />
        <Route path="/order-details/:orderId" element={<OrderDetails />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/about" element={<InfoPage type="about" />} />
        <Route path="/contact" element={<InfoPage type="contact" />} />
        <Route path="/faq" element={<InfoPage type="faq" />} />
        <Route path="/shipping" element={<InfoPage type="shipping" />} />
        <Route path="/returns" element={<InfoPage type="returns" />} />
        <Route path="/privacy" element={<InfoPage type="privacy" />} />
        <Route path="/terms" element={<InfoPage type="terms" />} />
        <Route path="/support" element={<InfoPage type="support" />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
