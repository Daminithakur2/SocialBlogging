import React from 'react'
import Image from '../image/mg9.webp'

const About = () => {
  return (
    <>
    <div className='mainabout'>
        <div><span className='sty'>Meet the face<br></br>
behind the posts</span><br></br><br></br>
        <span>I'm a paragraph. 
Click here to add your own text and edit <br></br>me.It’s easy.
 Just click “Edit Text” or double click me to<br></br> add your own content and make changes to the font.
  Feel <br></br>free to drag and drop me anywhere you like on your<br></br> page.
 I’m a great place for you to tell a story and let your<br></br> users know a little more about you.<br></br><br></br>
 This is a great space to write a long text about your<br></br> company and your services. You can use this space to go into<br></br> 
 a little more detail about your company. Talk about your<br></br> 
 team and what services you provide. Tell your visitors the<br></br> story of how you came up with the idea for your business<br></br>
  and what makes you different from your competitors.<br></br> Make your company stand out and show your visitors who you are.</span>
        </div>
        <div><img src={Image} alt="" /></div>
    </div>
      
    </>
  )
}

export default About
