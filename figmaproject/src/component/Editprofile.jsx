import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUserProfile } from './API/endpoints'
import Image from '../image/profile1.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfomation ,getUpdateInformation} from '../Redux/actions/user'



const Editprofile = () => {
  const dispatch = useDispatch()
  const userId = localStorage.getItem('userId')


  const  {userInfo}  = useSelector((state) => state.userInfo)
 
  const [editsection, setEditSection] = useState({
    userName: "",
    email: "",
    zipcode: "",
    country: "",
    state: ""
  });
  const fetchdata = async () => {
    // dispatch(getUserInfo(userId))
    dispatch(getUserInfomation(userId))
  }
  const profileupdate=async()=>{
    dispatch(getUpdateInformation({editsection,userId}))
  }
 
  useEffect(() => {
    fetchdata()
  }, [])
  console.log(userInfo.user,'rtyuio')

  const [error, setError] = useState({})
  const handleedit = () => {
    const error = {};
    if (!editsection?.profilephoto?.trim()) {
      error.Profilephoto = "profilephoto is required!"
    }
    else if (!editsection?.backgroundphoto?.trim()) {
      error.backgroundphoto = "backgroundphoto is required!"
    }
    else if (!editsection?.userName?.trim()) {
      error.userName = "userName is required!"
    }
    else if (!editsection?.email?.trim()) {
      error.email = "email is required!"
    }
    else if (!editsection?.zipcode?.trim()) {
      error.zipcode = "zipcode is required!"
    }
    else if (!editsection?.country?.trim()) {
      error.country = "country is required!"
    }
    else if (!editsection?.state?.trim()) {
      error.state = "state is required!"
    }
    else {
      alert("saved successfully")
    }
    setError(error)
  }

  const navigate = useNavigate()

  const [userData, setUserData] = useState({})
  const getUserInfo = async () => {
    try {
      const res = await getUserProfile(userId)
      setUserData(res.data.user)
    } catch (err) {
      console.log(err, 'vskdjjdfsk')
    }
  }
  useEffect(() => {
    setEditSection({
      ...editsection,
      userName:userInfo?.user?.userName,
      email:userInfo?.user?.email,
      zipcode:userInfo?.user?.zipcode,
      country:userInfo?.user?.country,
      state:userInfo?.user?.state
    })
  },[])
  return (
    <>
      <div>
        <div className='din-mein'>
          <div className='din-main'>
            <div className='din-one'>
              <div className='din-two2'>Edit profile</div>
              <div className='din-two2.1'><img className='img-tww' src={Image} alt="" /></div><br></br>

            </div>
          </div>
          <div className='din-bigg'> <label className='inn-one'>profilephoto</label>
            <input type='file' value={editsection.Profilephoto} onChange={(e) => setEditSection({ ...editsection, profilephoto: e.target.value })}></input><br></br>
            {error?.Profilephoto && <span style={{ color: "red" }}>{error?.Profilephoto}</span>}
            <label className='inn-one'>backgroundphoto</label>
            <input type='file' value={editsection.backgroundphoto} onChange={(e) => setEditSection({ ...editsection, backgroundphoto: e.target.value })}></input><br></br>
            {error?.backgroundphoto && <span style={{ color: "red" }}>{error?.backgroundphoto}</span>}
            <label className='inn-one'>userName</label>
            <input className='inn-two' placeholder='userName' value={editsection.userName} onChange={(e) => setEditSection({ ...editsection, userName: e.target.value })}></input><br></br>
            {error?.userName && <span style={{ color: "red" }}>{error?.userName}</span>}
            <label className='inn-one'>email</label>
            <input className='inn-two' placeholder='email' value={editsection.email} onChange={(e) => setEditSection({ ...editsection, email: e.target.value })}></input><br></br>
            {error?.email && <span style={{ color: "red" }}>{error?.email}</span>}
            <label className='inn-one'>zipcode</label>
            <input className='inn-two' placeholder='zipcode' value={editsection.zipcode} onChange={(e) => setEditSection({ ...editsection, zipcode: e.target.value })}></input><br></br>
            {error?.zipcode && <span style={{ color: "red" }}>{error?.zipcode}</span>}
            <label className='inn-one'>country</label>
            <input className='inn-two' placeholder='country' value={editsection.country} onChange={(e) => setEditSection({ ...editsection, country: e.target.value })}></input><br></br>
            {error?.country && <span style={{ color: "red" }}>{error?.country}</span>}
            <label className='inn-one'>state</label>
            <input className='inn-two' placeholder='state' value={editsection.state} onChange={(e) => setEditSection({ ...editsection, state: e.target.value })}></input><br></br><br></br>
            {error?.state && <span style={{ color: "red" }}>{error?.state}</span>}
            <button onClick={() => navigate("/userprofile")} className='butt'>cancel</button>&nbsp;&nbsp;&nbsp;&nbsp;<button className='butt' onClick={()=>profileupdate()}>save</button></div>
        </div>

      </div>

    </>
  )
}

export default Editprofile
