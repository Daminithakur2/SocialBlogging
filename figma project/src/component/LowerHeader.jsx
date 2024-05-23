import React, { useState, useEffect } from "react"
import { filterpost, getPostData, serachpost } from "./API/endpoints"
import { useNavigate } from "react-router-dom"
import { FaSearch } from "react-icons/fa";
import '../ALLCSS/header.css';
import { useDispatch, useSelector } from "react-redux";
import { fetchPost, getAllData } from "../Redux/actions/post";
import { getserachpost } from "../Redux/actions/post";
const LowerHeader = ({ setPost }) => {
    const navigate = useNavigate()
    // const [allBlog, setAllBlog] = useState([])
    const [title, setTitle] = useState('')
    const [created_date, setCreated_Date] = useState('')
    const [serachtext, setSerachText] = useState('')
    const [searchdata, setSerachData] = useState([])
    const dispatch = useDispatch()
    const posts = useSelector((state)=>state.post)
    console.log(posts)
    const handleserach = async (text) => {
        try {
            const res = await serachpost(text)
            if (res.data) {
                setSerachData(res.data)

            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleserachclick = async (text) => {
    dispatch(getserachpost(text))
       
    }
    // const handlechange = async () => {
    //     try {
    //         const res = await getPostData()
    //         if (res.data) {
    //             setAllBlog(res.data)
    //         }

    //     } catch (error) {
    //         console.log(error)
    //     }

    // }
    // const handlefilter = async () => {
    //     try {
    //         const res = await filterpost(title, created_date)
    //         if (res.data) {
    //             setPost(res.data)
    //         }

    //     } catch (err) {
    //         console.log('error during get filter data', err)
    //     }
    // }


    useEffect(() => {
        dispatch(fetchPost())
    }, [])
    useEffect(() => {
        dispatch(getAllData({ title, created_date }))
    }, [title, created_date])




    return (
        <div className="bottom-header">
            <div className="inside-header bottom-inside-header">
                <div className="filter" style={{borderRight:'2px solid',padding:'20px'}}>Filter</div>

                <div className="t">
                    <div className="t1">
                        <div className="created">Created by</div>
                        <div>
                            <select className="select" name="ALL" value={title} onChange={(e) => setTitle(e.target.value === "All" ? "" : e.target.value)}>
                                <option value='All'>
                                    All
                                </option>
                                {posts?.posts?.map((item, index) => {
                                    return <option value={item.title}>{item.title}</option>
                                })}
                            </select>
                        </div>
                    </div>

                    <div className="t2">
                        <div className="published">Published Date</div>
                        <div>
                            <input className="indate" style={{ width: 120 }} type="date" onChange={(e) => setCreated_Date(e.target.value)}></input>
                        </div>
                    </div>
                </div>

                <div className="t3">
                    <div className="search">Search</div>
                    <div className="input" style={{display:'flex'}}>
                        <input
                            className="search1"
                            type="search"
                            name="type here"
                            placeholder="type here"
                            value={serachtext}
                            onChange={(e) => {
                                const updatedText = e.target.value
                                setSerachText(updatedText);
                                handleserach(updatedText)
                            }}
                        />
                        <div className="icon1">
                            <FaSearch onClick={() => handleserachclick(serachtext)} />

                        </div>
                        {serachtext.length ? <div>
                            {

                                searchdata?.map((item, index) => <>
                                    <span onClick={() => navigate(`/fullpage/${item._id}`)} >{item.title}</span><br />
                                </>

                                )

                            }

                        </div> : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LowerHeader