import React, { useState } from 'react'
import { RiLockPasswordLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { sendemail } from './API/endpoints';
import Modal from 'react-modal';


const Forgetpassword = () => {
  const navigate = useNavigate()
  const [isopen,setIsopen]=useState(false)
  const [email, setEmail] = useState("")
  const handlesend = async () => {
    try {
      await sendemail({ email })
      setIsopen(true)
    } catch (err) {
      console.log(err, "email is not exists")
    }
  }
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  return (
    <>
      <div className='container11'>
        <div className='container-12'>
          <div style={{ display: 'flex', justifyContent: 'center', fontSize: 40, fontWeight: 600, padding: 40 }}><span>FORGOT PASSWORD</span></div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}><RiLockPasswordLine style={{ fontSize: 100 }} /></div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}><span style={{ fontSize: 30 }}>Forget password?</span></div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}><span>Enter your email below to reset your password</span></div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}> <input value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: 10, width: 190, border: 'none', borderBottom: '1px solid black' }} type="text" placeholder='Email' /></div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}><button style={{ height: 30, width: 190, backgroundColor: 'purple', color: 'white', border: 'none', borderRadius: 20 }} onClick={() => handlesend()}>Submit</button></div>
          <div style={{ display: 'flex', justifyContent: 'center' }}><span>back to <a href='/'>login</a></span></div>
        </div>
      </div>
      <Modal
        isOpen={isopen}
        style={customStyles}
      >
        <div style={{display:"flex", justifyContent:"center",flexDirection:"column",alignItems:"center"}}>
        <div>
          <p>Reset password is sent to your e-mail successfully. Please check e-mail</p>
        </div>
        <div>
          <button onClick={()=>navigate('/')}>OK</button>
        </div>
        </div>
      </Modal>
    </>
  )
}

export default Forgetpassword
