import React, { useEffect, useState } from 'react'
import Image from '../image/cartoon.jpg'
import { useParams } from 'react-router-dom'
import { getPostDataById } from './API/endpoints';
import { useDispatch } from 'react-redux';
import { getbyid, postComments } from '../Redux/actions/post';
import { useSelector } from 'react-redux';
const Fullpage = () => {
  const dispatch = useDispatch()
  const [text, settext] = useState({
    text: ''
  });
  const { getOnePost } = useSelector((state) => state.post)

  const { id } = useParams();
  const blogid = id;
  console.log(id, 'fkjdfdkfkg')
  const handleComment = () => {
    dispatch(postComments({ text, blogid }))
    dispatch(getbyid(blogid))
  }

  useEffect(() => {
    dispatch(getbyid(blogid))
  }, [])
  console.log(getOnePost, 'fdklmklf')
  return (
    <>
      <div className='main-containersfull'>
        <div className='main-blog'><span className='span-style'>Blog Details</span></div>
        <div><span style={{ textAlign: "center" }}>{getOnePost?.title}</span></div>
        <div><span style={{ textAlign: "center" }}>{getOnePost?.description}</span></div>
        <div className='fullpage-one'>

          <div>
            <img style={{ height: 400, width: 800 }} src={`http://localhost:5000/${getOnePost?.image}`} alt="" />
          </div>


          <div class="card">
            <div class="chat-header">Chat</div>
            <div class="chat-window">
              <ul class="message-list">

                {getOnePost?.comment?.map((item, index) => {
                  return <li>{item?.text}</li>
                })}
              </ul>
            </div>
            <div class="chat-input">

              <input type="text" class="message-input" placeholder="Type your message here" value={text.text} onChange={(e) => settext({ ...text, text: e.target.value })} />
              <button class="send-button" onClick={() => handleComment()}>Send</button>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Fullpage
