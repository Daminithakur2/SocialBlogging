import React, { useEffect, useState } from 'react'
import Image from '../image/back3.jpg'
import Image1 from '../image/profile1.jpg'
import { IoCameraReverseOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getPostData } from './API/endpoints';
import { getUserInfomation } from '../Redux/actions/user';
import { useDispatch, useSelector } from 'react-redux';
import { getupdatephoto } from '../Redux/actions/user';
import { fetchPost } from '../Redux/actions/post';
import Modal from 'react-modal';


const Userprofile = () => {
  // const [allpost, setAllPost] = useState()
  const dispatch = useDispatch()
  const userId = localStorage.getItem('userId')
  const [photo, setPhoto] = useState(false)
  const [Change, setChange] = useState(true)
  const [show, setShow] = useState(false)
  const { userInfo } = useSelector((state) => state.userInfo)
  const { posts } = useSelector((state) => state.post)
  console.log(posts, "allpost")

  // console.log(userInfo)
  const fetchdata = async () => {
    dispatch(getUserInfomation(userId))
  }
  const [form, setForm] = useState({
    profilephoto: "",
    backgroundphoto: ""
  })
  const updatephoto = async () => {
    const formData = new FormData()
    formData.append("profilephoto", form.profilephoto)
    formData.append("backgroundphoto", form.backgroundphoto)
    dispatch(getupdatephoto({ formData, userId }))
  }
  useEffect(() => {
    fetchdata()
    dispatch(fetchPost())
  }, [])

  const navigate = useNavigate()
  console.log(userInfo, '2345678909oiuhgfvdertyui')
  return (
    <>

      <div className='background'>
        <div className='cover-image'>
          <img className='cover-img' src={`https://socialblogging.onrender.com/${userInfo?.user?.backgroundphoto}`} alt="" />
          <button className='button-diva' onClick={() => setChange(false)}><IoCameraReverseOutline className='icon-s' onClick={() => setChange(false)} />Change photo</button>
          {!Change && <div style={{ position: 'absolute', right: 20, bottom: 250 }}><input type='file' onChange={(e) => {
            if (e.target.files.length) {
              const selectphoto = e.target.files[0];
              setForm({ ...form, backgroundphoto: selectphoto });
            } else {
              setForm({ ...form, backgroundphoto: {} });
            }
          }}></input><br></br>
            <button className='bcencel' onClick={() => setChange(true)}>cancel</button >&nbsp;&nbsp;&nbsp;&nbsp;<button className='bcencel' onClick={() => updatephoto()}>upload</button></div>}
        </div>
        <div className='diva-three'>
          <div className='diva-two'><img className='cover-two' src={`https://socialblogging.onrender.com/${userInfo?.user?.profilephoto}`} alt="" /><br></br>
            {!photo && <button className='button-9' onClick={() => setPhoto(true)}>Upload Photo</button>}</div>


          <div className='diva-four'>DAMINI THAKUR</div>
          {photo && <div className='cen-upl'><input type='file'
            onChange={(e) => {
              if (e.target.files.length) {
                const selectphoto = e.target.files[0];
                setForm({ ...form, profilephoto: selectphoto });
              } else {
                setForm({ ...form, profilephoto: {} });
              }
            }}
          ></input><br></br><br></br>
            <button className='bcencel' onClick={() => setPhoto(false)}>cancel</button>&nbsp;&nbsp;&nbsp;&nbsp;<button className='bcencel' onClick={() => updatephoto()}>upload</button></div>}
          <button className='button-9' onClick={() => setShow(true)} >Change Password</button>
        </div>
        <div className='diva-last1' >
          <div className='userinfo'><span className='spanning'>USER INFORMATION</span><br></br><br></br>
            <div ><span className='spanning-one'>user profile</span><br></br>
              <div className='spanning-two'>
                <label className='label-le'>User Name</label>
                <input className='input-li' disabled={true} value={userInfo?.user?.userName}></input><br></br>
                <label className='label-le'>email</label>
                <input className='input-li' value={userInfo?.user?.email} disabled={true}>
                </input><br></br>
                <label className='label-le'>zipcode</label>
                <input className='input-li' placeholder='zipcode' value={userInfo?.user?.zipcode} disabled={true}></input><br></br>
                <label className='label-le'>country</label>
                <input className='input-li' placeholder='country' value={userInfo?.user?.country} disabled={true}></input><br></br>
                <label className='label-le'>state</label>
                <input className='input-li' placeholder='state' value={userInfo?.user?.state} disabled={true}></input><br></br><br></br>
                <button className='edit-profile' onClick={() => navigate('/editprofile')}>Edit profile</button>
              </div>
            </div>

          </div>
          <div className='swiper-one'>
            <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
              style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: "center" }}
            >
              {posts?.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div style={{ display: 'inline', borderRadius: 20 }}>
                      <img style={{ width: 400, height: 500 }} src={`https://socialblogging.onrender.com/${item.image}`} alt='imag1' />
                    </div>
                  </SwiperSlide>
                )
              })
              }
            </Swiper>
          </div>
        </div >
        <Modal
          isOpen={show}
          style={{
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
              zIndex:99999,
              height:250,
              width:400,
              paddingTop:60
            }
          }}
        >
          <div>
            <div style={{display:'flex',justifyContent:'center'}}><input placeholder='change password'></input></div><br></br>
            <div style={{display:'flex',justifyContent:'center'}}> <input placeholder='confirm password'></input></div><br></br><br></br>
          <div style={{display:'flex',justifyContent:'center'}}><button style={{backgroundColor:'blue',color:'white',border:'none'}}>save</button></div>
          </div>
        </Modal>
      </div>
    </>
  )
}

export default Userprofile
