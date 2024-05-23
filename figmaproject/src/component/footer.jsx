import React from 'react'
import '../ALLCSS/footer.css';
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { FaRegCopyright } from "react-icons/fa";

const Footer = () => {
    return (

        <div className="footer-container">
            <div className="lastbigg">
                <div className="upper-footer">
                    <div className="last1">
                        <h2>Training Blog</h2>
                        <p className="space">welcome to our technicalblog. where we delve into<br/> the word cutting-edge
                            technologies and explore their<br/> practical application.</p>
                        </div>
                            <div className="last2">
                                <h2>CATEGORY</h2>
                                <ul>
                                    <li>HTML</li>
                                    <li>CSS</li>
                                    <li>JAVASCRIPT</li>
                                    <li>VS CODE</li>
                                </ul>
                            </div>
                            <div className="last3">
                                <h2>GET IN TOUCH</h2>
                                <ul className="ulq">
                                    <li>+91-8xxx-xxx-xx</li>
                                    <li>demo@gmail.com</li>
                                </ul>
                            </div>
                            <div className="last4">
                                <h2>FOLLOW US ON</h2><FaInstagram  className='icons1'/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <FaTwitter className='icons1' />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                         <FaLinkedin className='icons1' />                          
 
                         </div>
                    </div>
                </div>
        
                    <div className="under-footer">
                        <div className="left">
                            <p><FaRegCopyright />2023 TRAININGBLOG</p>

                        </div>
                        <div className="right">
                            <p>MADE WITH <FcLike />MOHALI INDIA</p>

                        </div>
                   
                </div>
            
            </div>
        
        
            )
}

 export default Footer
