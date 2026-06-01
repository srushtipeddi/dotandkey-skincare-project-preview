import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';
import baseUrl from '../../../BaseUrl/BaseUel';

function Login({changebtn}) {
  const navigate = useNavigate();
  
  // Fix 1: Use correct state names
  const [formData, setFormData] = useState({
    email:'',
    password:''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Fix 2: Complete handleChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Fix 3: Complete validateForm (basic version)
  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email required';
    if (!formData.password) newErrors.password = 'Password required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 const handleSubmit = (e) => {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  setIsLoading(true);

  axios.post(`${baseUrl}/login`, formData)
    .then((res) => {
      const status = res.data.status?.trim().toUpperCase();

      if (status === "ADMIN") {
        alert("Please login from admin login page");
        navigate("/admin-login");
        return;
      }

      alert("Login Successfully");

      localStorage.setItem("userEmail", res.data.email);
      localStorage.setItem("userData", JSON.stringify(res.data));

      window.dispatchEvent(new Event("login"));

      navigate("/userhome");
    })
    .catch((error) => {
      alert("Login failed");
      console.log(error);
    })
    .finally(() => {
      setIsLoading(false);
    });
};
  

  const openSignUpPage = () => {
    navigate('/signup');
  };

 return (
    <div className="login-container">
      <div className="container-fluid vh-100">
        <div className="row h-100">
          {/* Left Side - Brand/Image Section */}
          <div className="col-lg-6 col-md-12 d-none d-lg-block brand-section">
            <div className="brand-content">
              <div className="brand-logo">
                <i className="fas fa-shopping-bag fa-3x text-white mb-3"></i>
                <h1 className="brand-title">MyStore</h1>
                <p className="brand-subtitle">Welcome back to your dashboard</p>
              </div>
              <div className="brand-features">
                <div className="feature-item">
                  <i className="fas fa-rocket"></i>
                  <span>Fast & Secure</span>
                </div>
                <div className="feature-item">
                  <i className="fas fa-chart-line"></i>
                  <span>Real-time Analytics</span>
                </div>
                <div className="feature-item">
                  <i className="fas fa-headset"></i>
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="col-lg-6 col-md-12 form-section d-flex align-items-center">
            <div className="login-form-container">
              <div className="text-center mb-5">
                <h2 className="form-title">Welcome Back</h2>
                <p className="form-subtitle">Sign in to your account to continue</p>
              </div>

              <form onSubmit={handleSubmit} className="login-form">
                {errors.submit && (
                  <div className="alert alert-danger d-flex align-items-center" role="alert">
                    <i className="fas fa-exclamation-circle me-2"></i>
                    {errors.submit}
                  </div>
                )}

                {/* Email Field */}
                <div className="mb-4">
                  <label htmlFor="email" className="form-label">
                    <i className="fas fa-envelope me-2"></i>
                    Email Address
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fas fa-user"></i>
                    </span>
                    <input
                      type="email"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                    />
                    {errors.email && (
                      <div className="invalid-feedback">
                        {errors.email}
                      </div>
                    )}
                  </div>
                </div>

                {/* Password Field */}
                <div className="mb-4">
                  <label htmlFor="password" className="form-label">
                    <i className="fas fa-lock me-2"></i>
                    Password
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fas fa-key"></i>
                    </span>
                    <input
                      type="password"
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                    />
                    {errors.password && (
                      <div className="invalid-feedback">
                        {errors.password}
                      </div>
                    )}
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="rememberMe"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="rememberMe">
                      Remember me
                    </label>
                  </div>
                  <Link to="/forgot-password" className="forgot-password-link">
                    Forgot Password?
                  </Link>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100 login-btn"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Signing In...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-sign-in-alt me-2"></i>
                      Login
                    </>
                  )}
                </button>

                {/* Divider */}
                <div className="divider my-4">
                  <span>or continue with</span>
                </div>

                

                {/* Sign Up Link */}
                <div className="text-center">
                  <p className="signup-text">
                    Don't have an account?{' '}
                    <button type="button" className="signup-link" onClick={openSignUpPage}>
                      Sign up here
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;