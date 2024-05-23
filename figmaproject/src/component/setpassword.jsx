import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { resetpassword } from './API/endpoints'

const Setpassword = () => {
  const {email} = useParams()
  const[formData,setFormData]=useState({
    email:email,
    newpassword:"",
    confirmpassword:""
    
  })
  console.log(email,'dkfkddkj')
  const handlereset=async()=>{
    try{
      await resetpassword(formData)
      navigate('/')
    }catch(err){
      console.log(err,"invalid password")

    }

  }
  const navigate=useNavigate()
  return (
    <>
    <div className='container-5'>
    <div className='container-6'>
        <div style={{display:'flex',justifyContent:'center',marginTop:30}}><span style={{fontSize:50,fontWeight:500}}>FORGOT PASSWORD</span></div>
      <div style={{display:'flex',justifyContent:'center',marginTop:40}}><span style={{fontSize:20,fontWeight:500}}>Reset Your Password?</span></div>
      <div style={{display:'flex',justifyContent:'center',marginTop:30}}><span>strong password include number,letter,and punctuation marks</span></div>
      <div style={{display:'flex',justifyContent:'center',marginTop:40,flexDirection:'column',alignItems:'center'}}><label style={{display:'block'}}></label><input value={formData.email} onChange={(e)=>setFormData({...formData,email:e.target.value})} placeholder='email'  style={{width:190,border:'none',borderBottom:'1px solid black'}}></input></div>
      <div style={{display:'flex',justifyContent:'center',marginTop:40,flexDirection:'column',alignItems:'center'}}><label style={{display:'block'}}></label><input value={formData.newpassword} onChange={(e)=>setFormData({...formData,newpassword:e.target.value})} placeholder='enter new password'  style={{width:190,border:'none',borderBottom:'1px solid black'}}></input></div>
      <div style={{display:'flex',justifyContent:'center',marginTop:40,flexDirection:'column',alignItems:'center'}}><label style={{display:'block'}}></label><input onChange={(e)=>setFormData({...formData,confirmpassword:e.target.value})} value={formData.confirmpassword} placeholder='confirm new password' style={{width:190,border:'none',borderBottom:'1px solid black'}}></input></div>
 <div style={{display:'flex',justifyContent:'center' ,marginTop:30}}><button style={{height:30,width:190,backgroundColor:'red',color:'white',border:'none',borderRadius:20,backgroundColor:'purple'}} onClick={()=>handlereset()}>Reset password</button></div>
      </div>
      </div>
    </>
  )
}

export default Setpassword
