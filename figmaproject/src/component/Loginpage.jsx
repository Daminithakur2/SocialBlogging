import React, { useState } from 'react'
import { CiFacebook } from "react-icons/ci";
import { FaGooglePlusG } from "react-icons/fa";
import axios from 'axios';
import { CiLinkedin } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';

import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Loginpage = () => {
  const notify = () => toast("login successfully");
  const [formData, setformData] = useState({
    email: "",
    password: ""
  });
  const [error, setErrors] = useState({});
  const navigate = useNavigate();
  const data = {
    value: {
      nestedproperty: "value"
    },
  };
  const handlesubmit = async () => {
    //validation logic
    const errors = {};
    if (formData.email.trim() === "") {
      errors.email = "email is required";
    }
    if
    
    (formData.password.trim() === "") {
      errors.password = "password is required";
    }
    else if (Object.keys(errors).length === 0) {
      const res = await axios.post('http://localhost:5000/auth/login', formData);
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.userId);
        // alert("Login successfully")
        navigate('/figmas');

      }

    }
    setErrors(errors);

  };
  console.log(error, "errorerrorerror");

  return (
    <>
      <div className='mains'>
        <div className='headings'>
          <div>
            <h1>LOGIN PAGE</h1>
            <CiFacebook className='face' /><FaGooglePlusG className='face' /><CiLinkedin className='face' /><br></br>
            <span>or use your account</span>
            <input className='input-container' type='email'
              value={formData.email} onChange={(e) => setformData({ ...formData, email: e.target.value })
              } placeholder='email'></input><br></br>
              {error.email && <span style={{color:"red"}}>{error.email}</span>}<br></br>
            <input className='input-container' type='password'
              value={formData.password} onChange={(e) => setformData({ ...formData, password: e.target.value })} placeholder='password'></input><br></br>
            {error.password && <span style={{color:"red"}}>{error.password}</span>}<br></br>
            <span><a href='/forget'>forget your password </a></span><br></br>
            <br></br>  <button className='button' onClick={() =>{ handlesubmit(); notify()}}>LOGIN</button>
            <a href='/signup' style={{ display: 'block' }}>Don't have an account? Sign up</a>
          </div>

        </div>
        <div className='red'>
          <div>
            <h1>Hello,Friend!</h1>
            <span>Enter your personal details and start journey with us</span><br></br>
            <br></br>   <button className='button1' onClick={() =>{ handlesubmit(); notify()}}>LOGIN</button></div>
        </div>
      </div>
    </>


  )
}

export default Loginpage
