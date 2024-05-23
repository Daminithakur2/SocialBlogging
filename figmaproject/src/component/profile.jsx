import React, { useEffect, useState } from 'react'
import Image from "../image/cartoon.jpg"
import Image1 from "../image/profiles.jpg"
import { FaCameraRetro } from "react-icons/fa6";
import { getPostData, getUserProfile, updateprofile, updateprofilephoto } from './API/endpoints';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const Profile = () => {
  const [editprofile, setEditProfile] = useState(false)
  const [profilepic, setProfilePic] = useState()
  const userId = localStorage.getItem('userId')
  const [allpost, setAllPost] = useState()
  const fetchdata = async () => {
    try {
      const res = await getPostData()
      setAllPost(res.data)
    } catch (err) {
      console.log(err, 'jhjjj')
    }
  }
  useEffect(() => {
    fetchdata()
  }, [])


  const [userData, setUserData] = useState({})
  const getUserInfo = async () => {
    try {
      const res = await getUserProfile(userId)
      setUserData(res.data.user)
    } catch (err) {
      console.log(err, 'vskdjjdfsk')
    }
  }
  const handlepic = async () => {
    const formData = new FormData()
    formData.append("profilephoto", profilepic)
    await updateprofilephoto(formData, userId)
    getUserInfo()

  }
  const handleupdate = async () => {
    await updateprofile(userData, userId)
    handlepic()
    setEditProfile(false)

  }
  useEffect(() => {
    getUserInfo()
  }, [])
  return (
    <>
      <div style={{ backgroundColor: 'white' }}>
        <div

        >
          <div style={{ position: 'absolute', height: 300, width: '100%' }}><img style={{ height: 300, width: "100%", position: 'relative' }} src={Image} alt="" /></div>
          <div style={{ position: 'relative', top: 170, left: 30, height: 180, width: 180 }}>  <img style={{ height: 180, width: 180, borderRadius: '50%', marginRight: 40 }} src={`http://localhost:5000/${userData.profilephoto}`} alt="" /></div>
          <FaCameraRetro style={{ position: 'relative', left: 193, top: 110 }} />
          <div style={{ display: 'flex', justifyContent: 'space-around', flexDirection: 'column', gap: 40 }}>
            <div><span style={{ fontSize: 30, fontWeight: 500, margin: 20 }}>Blog</span>
              <span style={{ fontSize: 30, fontWeight: 500, margin: 20 }}>like</span>
              <span style={{ fontSize: 30, fontWeight: 500, margin: 20 }}>comment</span>
            </div>


          </div>

          <div>
            <div>g</div>
          </div>
          {
            !editprofile ? <button style={{ height: 40, width: 90, position: 'relative', top: 180, left: 40, backgroundColor: "blue", color: 'black', border: 'none' }} onClick={() => setEditProfile(true)}>edit</button> :
              <button style={{ position: 'relative', top: 170, }} onClick={() => setEditProfile(false)}>cancel</button>
          }
        </div>

        {
          editprofile ? <div style={{ textAlign: 'center', padding: 10 }}>
            <div style={{ padding: 10 }}> <label style={{ display: 'block' }}>profilephoto</label><input type="file" onChange={(e) => {
              if (e.target.files.length) {
                const selectedfile = e.target.files[0];
                console.log(selectedfile, "hjjkk")
                setProfilePic(selectedfile);
              } else {
                setProfilePic({})
              }
            }}></input></div>
            <div style={{ padding: 10 }}> <label style={{ display: 'block' }}>userName</label><input style={{ padding: 7, borderRadius: 20 }} value={userData.userName} onChange={(e) => setUserData({ ...userData, userName: e.target.value })} placeholder='userName'></input></div>
            <div style={{ padding: 10 }}> <label style={{ display: 'block' }}>email</label><input style={{ padding: 7, borderRadius: 20 }} value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} placeholder='email'></input></div>
            <div style={{ padding: 10 }}><label style={{ display: 'block' }}>zipcode</label><input style={{ padding: 7, borderRadius: 20 }} value={userData.zipcode} onChange={(e) => setUserData({ ...userData, zipcode: e.target.value })} placeholder='zipcode'></input></div>
            <div style={{ padding: 10 }}> <label style={{ display: 'block' }}>country</label><input style={{ padding: 7, borderRadius: 20 }} value={userData.country} onChange={(e) => setUserData({ ...userData, country: e.target.value })} placeholder='country'></input></div>
            <div style={{ padding: 10 }}> <label style={{ display: 'block' }}>state</label><input style={{ padding: 7, borderRadius: 20 }} value={userData.state} onChange={(e) => setUserData({ ...userData, state: e.target.value })} placeholder='state'></input></div>
            <div><button onClick={() => handleupdate()} style={{ height: 30, width: 70, backgroundColor: 'skyblue', color: 'black', border: 'none', borderRadius: 20 }}>save</button></div>
          </div> :
            <div style={{ display: 'flex' }}>
              <div style={{ display: "flex", flexDirection: 'column', paddingLeft: 150, gap: 20, marginTop: 165 }}>

                <div style={{ borderRadius: 10, padding: 10 }}>
                  <span style={{ fontWeight: '700', fontSize: 14 }}>User Name:</span> <span>{userData.userName}</span>
                </div>
                <div style={{ borderRadius: 10, padding: 10 }}>
                  <span style={{ fontWeight: '700', fontSize: 14 }}>E-mail:</span> <span>{userData.email}</span>
                </div>
                <div style={{ borderRadius: 10, padding: 10 }}>
                  <span style={{ fontWeight: '700', fontSize: 14 }}>country:</span> <span>hgjkl</span>
                </div>
                <div style={{ borderRadius: 10, padding: 10 }}>
                  <span style={{ fontWeight: '700', fontSize: 14 }}>zipcode:</span> <span>145025</span>
                </div>
                <div style={{ borderRadius: 10, padding: 10 }}>
                  <span style={{ fontWeight: '700', fontSize: 14 }}>state:</span> <span>dghj</span>
                </div>

              </div>
              <div>
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
                  {allpost?.map((item, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <div style={{ display: 'inline', borderRadius: 20 }}>
                          <img style={{ objectFit: 'contain', width: 400, height: 400 }} src={`http://localhost:5000/${item.image}`} alt='imag1' />
                        </div>
                      </SwiperSlide>
                    )
                  })
                  }
                </Swiper>
              </div>
            </div>
        }



      </div>

    </>
  )
}

export default Profile
