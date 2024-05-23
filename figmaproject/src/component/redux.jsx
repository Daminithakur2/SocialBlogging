import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {decrement,increment} from "../Redux/reducers/counterslice"

export function Counter() {
  const dispatch = useDispatch()
  const {count} = useSelector((state) => state.counter)
  console.log(count,'fdjkkfdjk')

  return (
  
      <div>
        <button style={{backgroundColor:'blue',color:'white'}} aria-label="Increment value" onClick={() => dispatch(increment())} >
          Increment
        </button>
        <span>{count}</span>
        <button style={{backgroundColor:'blue',color:'white'}} aria-label="Decrement value"onClick={() => dispatch(decrement())}>
          Decrement
        </button>
      </div>
  )
}

