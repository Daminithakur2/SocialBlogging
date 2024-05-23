import React, { useState,useMemo } from 'react'

const Home = () => {
    const [count,setCount]=useState(0);
    const arr=new Array(40_00_000).fill(0).map((elem,i)=>{
        return{
            index:i,
            isNumber:i==39_00_000,
        };
    });
    const [number,setNumber]=useState(arr);
    const filterNumber=useMemo(
        ()=>number.find((item)=>item.isNumber==true),
        [number]
    );
    console.log(filterNumber,'dj')
  return (
    <>
    <div>
        <h1>welcome to our websites</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
             Soluta natus tempora quibusdam ut ipsum inventore eaque
              ullam sed, quos perferendis provident, modi molestiae impedit
               temporibus asperiores, ratione recusandae ad error.</p>
               <button>{count}</button>
               <h2>our products</h2>
               <ul>
                <li>product 1</li>
                <li>product 2</li>
                <li>product 3</li>
                </ul>
                <button>all view product</button>
<span>{filterNumber.index}</span>
<button style={{marginLeft:30}}
onClick={()=>{
    setCount(count+1);
    if (count==10){
        setNumber(
            new Array(40_00_000).fill(0).map((elem,i)=>{
                return{
                    index:i,
                    isNumber:i===10_00_000,
                };
            })
        );
    }
}}>
    +
</button>


               
    </div>

      
    </>
  );
};

export default Home
