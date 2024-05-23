import React, { useState } from 'react'
import { CiFacebook } from "react-icons/ci";
import { FaGooglePlusG } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate()
  const [formData,setformData]=useState({
    userName:"",
    email:"",
    password:"",
    confirmpassword:""

  });
  const[error,setErrors]=useState({})
  const handlesubmit = async () => {
    //validation logic
    const errors = {};
    if (formData.userName.trim() === "") {
      errors.userName = "userName is required";
    }
    if
    (formData.email.trim() === "") {
      errors.email = "email is required";
    }
    if(formData.password.trim()===""){
      errors.password="password is required"
    }
    if(formData.confirmpassword.trim()===""){
      errors.confirmpassword="confirmpassword is required"
    }
    else if (Object.keys(errors).length === 0) {
       await axios.post('http://localhost:5000/auth/signup', formData);
         alert("Signup successfully")
        navigate('/');

      

    }
    setErrors(errors);

  };
  return (

    <>
      <div className='mains'>
        <div className='red'>
          <div>
          
          <h1>Welcome Back</h1>
          <span>To keep connected with us please login with your personal info</span><br></br>
          <br></br>   <button onClick={()=>handlesubmit()} className='button1'>SIGN IN</button></div>
          </div>

        <div className='headings'>
          <div>
            <h1>Create Account</h1>
            <CiFacebook className='face' /><FaGooglePlusG className='face' /><CiLinkedin className='face' /><br></br>
            <span>or use your account</span>
            <input className='input-container'  type='username' value={formData.userName} onChange={(e)=>setformData({...formData,userName:e.target.value})} placeholder='username'></input><br />
            { error.userName && <span style={{color:'red'}}>{error.userName}</span> }<br/>
            <input className='input-container' type='email' value={formData.email} onChange={(e)=>setformData({...formData,email:e.target.value})} placeholder='email'></input><br />
            { error.email && <span style={{color:'red'}}>{error.email}</span> } <br/>
            <input className='input-container' type='password' value={formData.password} onChange={(e)=>setformData({...formData,password:e.target.value})} placeholder='password'></input><br />
            { error.password && <span style={{color:'red'}}>{error.password}</span> }<br/>
            <input className='input-container' type='password' value={formData.confirmpassword} onChange={(e)=>setformData({...formData,confirmpassword:e.target.value})} placeholder='confirm password'></input><br />
            { error.confirmpassword && <span style={{color:'red'}}>{error.confirmpassword}</span> }<br></br>
            <button className='button' onClick={() => handlesubmit()}>SIGN IN</button>
            <a href='/' style={{ display: 'block' }}>Already have an account?</a>
          </div>
        </div>

      </div>
    </>
  )
}

export default Signup
