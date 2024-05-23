import React from 'react'
import "../ALLCSS/lowernew.css"
import Image from '../image/blognest.png'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import Post from './Post';


const Lowernew = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { posts } = useSelector((state) => state.post)


  return (
    <>
    <div className='container-ln'>
        <div className='logo-new'><img className='img-new' src={Image} alt="" /></div>
        <div className='list-new'>
            <li className='lists-new2' onClick={()=>navigate('/figmas')}>Home</li>
            <li className='lists-new1' onClick={()=>navigate('/allblog')}>My blogs</li>
            <li className='lists-new1' onClick={()=>navigate('/About')}>About</li>
            <li className='lists-new1' onClick={()=>navigate('/userprofile')}>Profile</li>
            <li className='lists-new1'  onClick={() => { localStorage.clear(); navigate('/') }}>Logout</li>

        </div>
    </div>
      
    </>
  )
}

export default Lowernew
