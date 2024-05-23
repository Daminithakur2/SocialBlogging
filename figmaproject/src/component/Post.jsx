import axios from 'axios';
import React, { useEffect, useState } from 'react'
import image1 from "../image/box1.png"
import profile from '../image/profile.jpeg';
import "../ALLCSS/boxbigg1.css"
import { FaHeart } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { UNSAFE_DataRouterStateContext, useNavigate } from 'react-router-dom';
// import Image from '../image/OIP.jpeg'
import { useDispatch } from 'react-redux';
import { blogcomments, deletecomment, getPostData, updateByPatch } from './API/endpoints';
import { getdeletepost } from '../Redux/actions/user';
import { fetchPost } from '../Redux/actions/post';



const Post = ({ data, postdate, render, setRender }) => {
    const [isopen, setIsopen] = useState(false);
    const dispatch = useDispatch()
    const [inputvalue, setInputvalue] = useState("");
    const [show, setShow] = useState(false)
    const toggleInputBox = () => {
        setIsopen(!isopen);
    };
    const handleInputChange = (e) => {
        setInputvalue(e.target.value);
    }
    const handlesubmit1 = (e) => {
        e.preventDefault();
        console.log("submitted:", inputvalue);
        setInputvalue("");
        setIsopen(false);
    };
    const navigate = useNavigate()
    const [text, settext] = useState();
    const [allpost, setPost] = useState([]);
    const fetchpost = async () => {
        try {
            // const token = localStorage.getItem("token")
            // const headers = {
            //     Authorization:`Bearer ${token}`,
            // }
            // const res = await axios.get("http://localhost:5000/post",{headers});
            const res = await getPostData()
            if (res.data) {
                setPost(res.data.map((item) => ({ ...item, liked: false })));
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (id) => {
        dispatch(getdeletepost(id))
        dispatch(fetchPost())


    }

    useEffect(() => {
        fetchpost();
    }, [])
    const sendcomment = async (text, postId) => {
        await blogcomments(text, postId);
        setRender(!render)
    };
    const handledeletecomment = async (Id, commentId) => {
        await deletecomment(Id, commentId);
        setRender(!render)
    }



    //coment button
    const handlecomment = (postId) => {
        const comment = allpost.map((post) => {
            return post._id === postId ? { ...post, comment: !post.comment } : post;
        })
        setPost(comment);
    }
    const togglelike = async (postId) => {
        // const like = allpost.map((post) => post._id === postId ? { ...post, liked: !post.liked } : post)
        await updateByPatch({ liked: !data.liked }, postId)
        // setPost(like);
        setRender(!render)
    }
    return (
        <>

        
            <div className="post" key={data._id}>
                <div className='new-post'><div onClick={() => navigate(`/fullpage/${data._id}`)}>
                    <img className="postimage" src={`http://localhost:5000/${data.image}`} alt="yy"></img></div>
                   <div className='new-divs'> <h2 className="heading"><span style={{ fontWeight: '500',color:'rgb(187,90,58)' }}>{data.title}</span></h2>
                    <span style={{ fontWeight: '500',color:'rgb(187,90,58)'}}>{data.description}</span>
                    <div className="details">
                    <img className='image' src={`http://localhost:5000/${data.image}`} alt='imag1'></img>
                    <div className="name">
                        <span className='namedam'>Damini</span>
                        <div className="details2">
                            <p className='datedam'>{postdate}</p>
                            {data.liked ? <FaHeart className="al" onClick={() => togglelike(data._id)}

                                style={{ color: "red" }} /> : <FaRegHeart className="al" onClick={() => togglelike(data._id)}
                                    style={{ color: "black" }} />}
                            <FaComment onClick={() => setShow(!show)} className="al" />
                            <p>202</p><br></br>

                        </div>
                        <div className='last-constainer'>
                            <div className='delete' onClick={() => handleDelete(data._id)}> <MdDeleteForever className='deleteicon' /></div>
                            <div className='edit'>   <MdEdit className='editicon' onClick={() => navigate(`/Updatenew/${data._id}`)} /></div>
                        </div>
                    </div>
                </div></div>
                    
                </div>

                
          
                {
                    data.comment.length ? <h4 style={{ margin: 0 }}>Comments:</h4> : null}
                {
                    data.comment.length > 0 ?
                        data.comment.slice(0, 3).map((item, index) => {
                            return (
                                <div style={{ display: 'flex' }}>
                                    <span style={{ display: 'block', fontWeight: '700', marginLeft: 10 }}>
                                        {item.text}
                                    </span>
                                    <MdDeleteForever onClick={() => handledeletecomment(data._id, item._id)} />
                                </div>
                            );
                        }) : null
                }
                {show &&
                    <div style={{ marginBottom: 20 }}>
                        <h4>comment:</h4>
                        <div><input type='text' value={text} onChange={(e) => settext(e.target.value)} onClick={handlesubmit1} placeholder='write a comment'></input>
                            <button onClick={() => { sendcomment({ text }, data._id); settext("") }}>send</button></div>

                    </div>
                }
                
            </div>
            {/* <button className='butt-new' >ALL POST</button> */}
        

        </>

    )
}

export default Post
