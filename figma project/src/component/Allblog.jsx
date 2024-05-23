import React from 'react'
import Post from './Post';
import { useDispatch, useSelector } from 'react-redux';
import { useState,useEffect } from 'react';
import { fetchPost } from '../Redux/actions/post';




const Allblog = () => {
    const dispatch = useDispatch()

    const { posts } = useSelector((state) => state.post)
    console.log(posts, "posts")
    const [render, setRender] = useState(false)
    useEffect(() => {
        // fetchpost();
        dispatch(fetchPost())
    }, [render])

  return (
    <>
    <div>
        <div className='coinone'>MY ALLBLOGS</div>
        <div className='itsall'>
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
        </div>
    </div>
        
      
    </>
  )
}

export default Allblog
