import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPost } from './API/endpoints'
import { useDispatch } from 'react-redux'
import { fetchPost, getcreatepost } from '../Redux/actions/post'

const Newblog = () => {
  const dispatch = useDispatch()

  const navigate = useNavigate()
  const [formData, setformData] = useState({
    title: "",
    description: "",
    image: ""
  });
  const [allpost, setAllPost] = useState([])
  const [error, setErrors] = useState({})
  const handlesubmit = async () => {
    const errors = {};
    if (formData.title.trim() === "") {
      errors.title = "title is required";
    }
    if
      (formData.description.trim() === "") {
      errors.description = "description is required";
    }
    if (formData.image == "") {
      errors.image = "image is required"
    }

    else if (Object.keys(errors).length === 0) {
      try {
        const newFormData = new FormData()
        newFormData.append("title", formData.title)
        newFormData.append("description", formData.description)
        newFormData.append("image", formData.image)
        dispatch(getcreatepost(newFormData))
        dispatch(fetchPost())
        alert("blog created successfully")
        navigate('/figmas');


      } catch (err) {
        console.log(err, 'rejrejejr')
      }
    }
    setErrors(errors);

  };
  return (
    <>
      <div className='containers'>

        <div className='con'><h1>BLOG POST</h1></div>
        <div className='blogspages'>
          <div>
            <h1 style={{ textAlign: 'center' }}>NEW BLOG</h1>
            <div style={{ display: 'flex', justifyContent: "center", alignItems: "center", flexDirection: 'column', gap: 20 }}>
              <input className='input-jam' type='text' value={formData.title} onChange={(e) => setformData({ ...formData, title: e.target.value })} placeholder='title'></input>
              <input className='input-jam' type='text' value={formData.description} onChange={(e) => setformData({ ...formData, description: e.target.value })} placeholder='description'></input>
              <input type='file' onChange={(e) => {
                setErrors({});
                if (e.target.files.length) {
                  const selectedfile = e.target.files[0];
                  setformData({ ...formData, image: selectedfile })


                } else {
                  setformData({ ...formData, image: {} });
                }
              }}>

              </input>
              <button className='submit' onClick={() => handlesubmit()}>Create</button>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Newblog
