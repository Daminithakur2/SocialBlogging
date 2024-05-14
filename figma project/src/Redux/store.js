import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./reducers/userSlice";
import { postSlice } from "./reducers/postSlice";


export const store=configureStore({
    reducer:{
        userInfo :userSlice.reducer,
        post:postSlice.reducer,
        
    }
})