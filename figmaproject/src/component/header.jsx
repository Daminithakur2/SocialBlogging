import { SiYourtraveldottv } from "react-icons/si";

import React, { useEffect, useState } from 'react';
import '../ALLCSS/header.css';
import Image from "../image/box1.png"
import { useNavigate } from "react-router-dom";
import { filterpost, getPostData, getUserProfile, updateprofile } from './API/endpoints';

const Header = () => {
    const navigate = useNavigate()

    const [userData, setUserData] = useState({})
    const [title, setTitle] = useState([])
    const handlechange = async () => {
        try {
            const res = await getPostData()
            if (res.data) {
                setTitle(res.data)


            }

        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        handlechange()
    }, [])
    // const handlefilter=async()=>{
    //     try{
    //         const res=await filterpost()
    //         if(res.data){

    //         }
    //     }
    // }
    const userId = localStorage.getItem('userId')


    const getUserInfo = async () => {
        try {
            const res = await getUserProfile(userId)
            setUserData(res.data.user)
        } catch (err) {
            console.log(err, 'vskdjjdfsk')
        }
    }
    useEffect(() => {
        getUserInfo()
    }, [])
    return (
        <>

            <header className="header">
                <div>
                    <div className="inside-header">
                        <div className="right-top-inside-header">

                            <SiYourtraveldottv style={{ fontSize: 50, color: "purple" }} /><span style={{ fontSize: 50, color: "pink" }}>Travel Blog</span>
                        </div>
                        <div className="left-top-inside-header">
                            <div className="image-inside-header">
                                <image
                                    class="image-top-inside-header"
                                    src="https://cdn3.iconfinder.com/data/icons/avatars-flat/33/man_5-1024.png"
                                />
                            </div>
                            <div className="name" style={{ display: "flex", alignItems: 'center' }}>
                                <img src={`http://localhost:5000/${userData.profilephoto}`} alt="" style={{ height: 35, width: 35, borderRadius: 50 }} /><span style={{ fontSize: 14, fontWeight: '500' }} onClick={() => navigate("/userprofile")}>Damini thakur</span></div>
                        </div>
                    </div>


                </div>

            </header>




        </>
    );
};
export default Header;