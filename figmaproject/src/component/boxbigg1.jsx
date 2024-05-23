import image1 from "../image/box1.png"
import profile from '../image/profile.jpeg';
import "../ALLCSS/boxbigg1.css"
import { FaHeart } from "react-icons/fa6";
import { FaComment } from "react-icons/fa";

const Boxbigg1 = () => {
    return (
        <>
            <div className="post">

                <div>
                    <img className="postimage" src={image1} alt="yy"></img>
                    
                    <h2 className="heading">How To Make GUI In Java With Example Example</h2>
                    <hr></hr>
                </div>
                <div className="details">
                    <img className='image' src={profile} alt='imag1'></img>
                    <div className="name">
                        <h3>Damini</h3>
                        <div className="details2">
                            <p>Jan 10 2024</p>
                            <FaHeart  className="al"/>
                            <p>100</p>
                            <FaComment  className="al"/>
                            <p>202</p>
                        </div>
                    </div>
                </div>



            </div>
        </>


    )
}
export default Boxbigg1