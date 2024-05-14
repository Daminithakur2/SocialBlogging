import React, { useState, useEffect } from 'react';
import '../ALLCSS/main.css';
import { useNavigate } from 'react-router-dom';
import Post from './Post';
import axios from 'axios';
import { getPostData } from './API/endpoints';
import LowerHeader from './LowerHeader';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPost } from '../Redux/actions/post';
import image from '../image/OIP.jpeg'


const Main = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // const [allpost, setPost] = useState([]);
    const { posts } = useSelector((state) => state.post)
    console.log(posts, "posts")
    const [render, setRender] = useState(false)

    useEffect(() => {
        // fetchpost();
        dispatch(fetchPost())
    }, [render])
    return (
        <>
            <LowerHeader></LowerHeader>
            <div className="main-container">

                <div className='blog-heading'><h1 className="heading1">BLOG POSTS</h1>
                    {posts && <div className='create-blog'><button className='anim' onClick={() => navigate('/newblog')}>Create</button></div>}
                    <div className='lgout'><button className='anim' onClick={() => { localStorage.clear(); navigate('/') }}>Logout</button></div>


                </div>

                <div className='main-content' >

                    {posts?.map((post, index) => {
                        const months = ["jan", "feb", "mar", "apr", "may", "june", "july", "aug", "sep", "oct", "nov", "dec"]
                        const createdDate = new Date(post.created_date)
                        console.log(createdDate, 'dvjjcreatedDate')
                        const date = createdDate.getDate()
                        const monthsindex = createdDate.getMonth()
                        const year = createdDate.getFullYear()
                        const currentmonth = months[monthsindex]
                        const postdate = `${date} ${currentmonth}  ${year}`
                        return (<Post data={post} postdate={postdate} render={render} setRender={setRender}></Post>)
                    })}


                    {
                        !posts?.length &&
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: "center" }}>
                            <div style={{ backgroundColor: 'white', paddingLeft: 50, paddingRight: 50, paddingBottom: 50, borderRadius: 20, minHeight: 250, minWidth: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 10 }}>
                                <div > <img src={image} style={{ height: 150, width: 150 }} alt='damini' ></img></div><br></br>
                                <div> <span style={{ display: 'block', fontSize: 40, fontWeight: 700 }}>No Blog Found</span></div><br></br><br></br>
                                <div><button className='changebutton' style={{ padding: 10, borderRadius: 10 }} onClick={() => navigate('/newblog')}>CREATE BLOG</button></div>

                            </div>
                        </div>}









                </div>
            </div>
        </>
    )
}
export default Main