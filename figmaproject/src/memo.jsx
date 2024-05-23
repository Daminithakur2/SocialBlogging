import React, { useEffect,useRef,useState } from 'react'

const Memo = () => {
    const[count,setCount]=useState()
    const ref=useRef(null);
    const a = useRef(null)
    const handlebutton=()=>{
        ref.current.style.backgroundColor='red';
        a.current.style.backgroundColor='yellow'
    };
  return (
    <>
    <div>
        <div >
        <p ref={a}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae voluptas reprehenderit ad neque.
             Modi commodi, voluptatum corporis enim earum vel! Unde blanditiis dolorum beatae accusamus eaque sint expedita earum ipsa?</p>
             </div>
             <button onClick={()=>{handlebutton();}}>+</button>
             <button ref={ref}>-</button>
    </div>
      
    </>
  )
}

export default Memo
