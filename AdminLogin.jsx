import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import baseUrl from "../../../BaseUrl/BaseUel";
import "../AdminLogin/AdminLogin.css";

function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();

    axios.post(`${baseUrl}/login`, formData)
      .then((res) => {
        const status = res.data.status ? res.data.status.trim().toUpperCase() : "";

        if (status === "ADMIN") {
          localStorage.setItem("userEmail", res.data.email);
          localStorage.setItem("userData", JSON.stringify(res.data));

          window.dispatchEvent(new Event("login"));

          alert("Admin Login Successfully");
          navigate("/dashboard");
        } else {
          alert("You are not admin");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Admin login failed");
      });
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <div className="text-center mb-5">
          <h2 className="form-title">Admin Login</h2>
          <p className="form-subtitle">Only admin can login here</p>
        </div>

        <form onSubmit={handleAdminLogin} className="login-form">
          <div className="mb-4">
            <label className="form-label">Admin Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter admin email"
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Admin Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter admin password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-lg w-100 login-btn">
            Admin Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;