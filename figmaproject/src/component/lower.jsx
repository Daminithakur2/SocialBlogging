import '../ALLCSS/lower.css';
import { FaSearch } from "react-icons/fa";
const Lower=()=>{
    return(
        <div className="container2">
            
            <div className="main"><h2>filter</h2> 
            <div className="created"><h3 className='filter'>Created By</h3><select><option>All</option><option>All</option><option>All</option></select></div>
            <div className="date"><h3  className='filter'>Published Date</h3><select><option>select Date</option><option>select Date</option><option>select Date</option></select></div>
            </div>
            
            <div className="main2"><h3  className='filter'>Search</h3><input></input><FaSearch className='serach2' /></div>
        
        </div>
    )
}
export default Lower