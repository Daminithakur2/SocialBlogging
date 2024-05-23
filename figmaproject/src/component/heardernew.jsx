import React from 'react'
import { FaSearch } from "react-icons/fa";
import "../ALLCSS/heardernew.css"
import { useState } from "react";
import { getserachpost } from "../Redux/actions/post";
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchPost, getAllData } from "../Redux/actions/post";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaSnapchatGhost } from "react-icons/fa";




const Heardernew = () => {
    const navigate = useNavigate()

    const dispatch=useDispatch()
    const posts = useSelector((state)=>state.post)
    console.log(posts,"esxrcfgvhbj")


    const [title, setTitle] = useState('')


    const [serachtext, setSerachText] = useState('')
    const [created_date, setCreated_Date] = useState('')

    // const [searchdata, setSearchhData] = useState([])

    const handleserach =  (text) =>{
           dispatch(getserachpost(text))
    }
    const handleserachclick = async (text) => {
        dispatch(getserachpost(text))
           
        }
        useEffect(() => {
            dispatch(fetchPost())
        }, [])
        useEffect(() => {
            dispatch(getAllData({ title, created_date }))
        }, [title, created_date])
        useEffect(()=>{
            handleserach(serachtext)
        },[serachtext])

  return (
    <>
    <div className='containernew'>
        <div className='div-new'>
        < input type="text" placeholder='search..'
        value={serachtext} 
        onChange={(e) => {
            const updatedText = e.target.value
            setSerachText(updatedText);
            handleserach(updatedText)
        }}
         className='input-new' />
          <div className="iconseach">
                            <FaSearch onClick={() => handleserachclick(serachtext)} />

                        </div>
                        {serachtext.length ? <div className='sec-new'>
                            {

                                posts?.searchT.map((item, index) =>
                               {return  <>
                                    <span style={{color:'white'}} onClick={() => navigate(`/fullpage/${item._id}`)} >{item.title}</span><br />
                                </>}

                                )

                            }
                        

                        </div> : null}
                        </div>
        <div className='newdiv1'><div className="published-new"></div>
                        <div>
                            <input className="indated"  type="date" onChange={(e) => setCreated_Date(e.target.value)}></input>
                        </div></div>
        <div className='newdiv2'><div className="created-new"></div>
                        <div>
                            <select className="select-new" name="ALL" value={title} onChange={(e) => setTitle(e.target.value === "All" ? "" : e.target.value)}>
                                <option value='All'>
                                    All
                                </option>
                                {posts?.posts?.map((item, index) => {
                                    return <option value={item.title}>{item.title}</option>
                                })}
                            </select>
                        </div></div>
        <div className='newdiv3'><FaFacebookF className='icon-onen' /><FaInstagram className='icon-onen' />
        <FaTwitter className='icon-onen' /><FaSnapchatGhost className='icon-onen'/></div>
    </div>
      
    </>
  )
}

export default Heardernew
