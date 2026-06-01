import React, { useState } from 'react'
import './Registration.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import baseUrl from '../../../BaseUrl/BaseUel';

function Registration() {
const navigate =useNavigate();

const [register, setregister] = useState({
  email:'',
  username:'',
  password:'',
  mobile_no:''

})

const handleSignup=(e)=>{
  e.preventDefault();
  //Add signup login here
  console.log(register);
  axios.post(`${baseUrl}/register`,register)
  .then((res)=>{
    console.log(res.data);
    alert("Signup Submitted!!!!"); 
    navigate('/login');
  }).catch((error)=>{
    alert("server side error",error);
  })
 
};

const handleChange =(e)=>{
  const {name , value }= e.target;
  setregister({...register,
    [name]:value
})
}

  return (
    <div className="signup-wrapper">
      <div className="container-fluid">
        <div className="row signup-row">
          
          {/* Left Side - Illustration */}
          <div className="col-lg-6 col-md-12 signup-illustration">
            <div className="illustration-content">
              <div className="illustration-icon">
                <i className="fas fa-user-plus"></i>
              </div>
              <h1 className="illustration-title">Join Our Community</h1>
              <p className="illustration-subtitle">
                Create your account and unlock exclusive features, personalized content, and seamless experience.
              </p>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="col-lg-6 col-md-12 signup-form-container d-flex align-items-center">
            <div className="signup-form-box">
              <div className="signup-header">
                <h2 className="signup-title">Create Account</h2>
                <p className="signup-subtitle">Fill in your details to get started</p>
              </div>

              <form className="signup-form" onSubmit={handleSignup}>
                {/* Username Field */}
                <div className="form-group">
                  <label className="input-label">
                    <i className="fas fa-user"></i>Username
                  </label>
                  <div className="input-wrapper">
                    <i className="fas fa-user input-icon"></i>
                    <input 
                      type="text" 
                      onChange={handleChange}
                      name='username'
                      className="form-input" 
                      placeholder="Enter username" 
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="form-group">
                  <label className="input-label">
                    <i className="fas fa-envelope"></i>Email Address
                  </label>
                  <div className="input-wrapper">
                    <i className="fas fa-at input-icon"></i>
                    <input 
                      type="email"
                      onChange={handleChange}
                      name='email' 
                      className="form-input" 
                      placeholder="Enter email" 
                    />
                  </div>
                </div>

                {/* Mobile Field */}
                <div className="form-group">
                  <label className="input-label">
                    <i className="fas fa-mobile-alt"></i>Mobile Number
                  </label>
                  <div className="input-wrapper">
                    <i className="fas fa-phone input-icon"></i>
                    <input 
                      type="tel" 
                      onChange={handleChange}
                      name='mobile_no'
                      className="form-input" 
                      placeholder="Enter mobile number" 
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="form-group">
                  <label className="input-label">
                    <i className="fas fa-lock"></i>Password
                  </label>
                  <div className="input-wrapper">
                    <i className="fas fa-key input-icon"></i>
                    <input 
                      type="password"
                      onChange={handleChange} 
                      name='password'
                      className="form-input" 
                      placeholder="Create password" 
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button type="submit" className="signup-button">
                  <i className="fas fa-user-plus"></i>
                  Create Account
                </button>

                {/* Divider */}
                <div className="divider">
                  <span>Already have an account?</span>
                </div>

                {/* Login Link */}
                <div className="login-link-container">
                  <span>Sign in to your account</span>
                  <a href="/login" className="login-link">
                    Login here
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



export default Registration
