import React from 'react'
import Image from '../image/bacgr.webp'
import Image1 from '../image/backgr2.webp'
import Image2 from '../image/backgr3.webp'
import '../ALLCSS/Page3.css'

const Page3 = () => {
  return (
    <>
    <div className='container-pg3'>
        <div><img className='img-pg3' src={Image} alt="" /></div>
        <div><img className='img-pg3' src={Image1} alt="" /></div>
        <div><img className='img-pg3' src={Image2} alt="" /></div>
        <div className='last-new'><span className='span-last1'>My Life My Blog.</span></div>


    </div>
      
    </>
  )
}

export default Page3
