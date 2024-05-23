import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getupdate } from '../Redux/actions/post'
import { getbyid } from '../Redux/actions/post'

const Updatenew = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [updatedetails, setupdate] = useState({
    title: "",
    description: "",
    image: ""
  })
  const posts = useSelector((state) => state.post)
  console.log(posts, "updatepage")
  //get data API
  const { id } = useParams();
  const getData = async () => {

    dispatch(getbyid(id))

    setupdate({
      title: posts.getOnePost.title,
      description: posts.getOnePost.description,
      image: posts.getOnePost.image
    })

  }
  useEffect(() => {
    getData();
  }, [id])
  const handleFile = (e) => {
    const file = e.target.file[0];
    setupdate({ ...updatedetails, image: file });

  };
  const [errors, setErrors] = useState({});
  const handleupdate = async () => {
    const error = {};
    if (!updatedetails.title.trim()) {
      error.title = "title is required!";
    }
    if (!updatedetails.description.trim()) {
      error.description = "description is required!";
    }
    else if (Object.keys(error).length === 0) {
      try {
        dispatch(getupdate({ updatedetails, id }))


        alert("updated successfully!");
        navigate("/figmas")
      } catch (err) {
        console.log(err);
      }
    }
    setErrors(error);

  }
  return (
    <>


      <div className='containers'>

        <div className='con'><h1>UPDATE THE BLOGS</h1></div>
        <div className='blogspages'>
          <div>

            <h1 style={{ textAlign: 'center' }}>UPDATE BLOG</h1>
            <div style={{ display: 'flex', justifyContent: "center", alignItems: "center", flexDirection: 'column', gap: 20 }}>
              <input className='input-jam' type='text' placeholder='title' value={updatedetails.title} onChange={(e) => setupdate({ ...updatedetails, title: e.target.value })}></input>
              <input className='input-jam' type='text' placeholder='description' value={updatedetails.description} onChange={(e) => setupdate({ ...updatedetails, description: e.target.value })}></input>
              <input type='file' onChange={(e) => handleFile(e)} className='file'></input>
              <button style={{backgroundColor:'rgb(187, 90, 58)',border:'none',borderRadius:20,padding:10,width:70}} onClick={() => handleupdate()}>Create</button>
            </div>
          </div>
        </div>

      </div>
    </>

  )
}

export default Updatenew
