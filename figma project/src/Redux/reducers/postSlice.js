import { createSlice } from "@reduxjs/toolkit";
import { fetchPost } from "../actions/post";
import { getAllData } from "../actions/post";
import { filterpost } from "../../component/API/endpoints";
import { getbyid } from "../actions/post";
import { getserachpost } from "../actions/post";
const initialState = {
    posts: [],
    getOnePost : null,
    loading: false,
    error:null
}

export const postSlice = createSlice({
    name: 'damini',
    initialState, reducers: {}, extraReducers: (builders) => {
        builders.addCase(fetchPost.pending, (state) => {
            state.loading = true
        })
           builders.addCase(fetchPost.fulfilled, (state, action) => {
                state.loading = false
                state.posts = action.payload
            })
            builders.addCase(fetchPost.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            builders.addCase(getAllData.rejected,(state,action)=>{
                state.loading=false
                state.error=action.payload
            })
            builders.addCase(getAllData.fulfilled,(state,action)=>{
                state.loading=false
                state.posts=action.payload
            })
            builders.addCase(getAllData.pending,(state)=>{
                state.loading=true
            })
            builders.addCase(getbyid.pending,(state)=>{
                state.loading=true
            })
            builders.addCase(getbyid.fulfilled,(state,action)=>{
                state.loading=false
                state.getOnePost=action.payload
            })
            builders.addCase(getbyid.rejected,(state,action)=>{
                state.loading=false
                state.error=action.payload
            })
            builders.addCase(getserachpost.pending,(state)=>{
                state.loading=true
            })
            builders.addCase(getserachpost.fulfilled,(state,action)=>{
                state.loading=false
                state.getOnePost=action.payload
            })
            builders.addCase(getserachpost.rejected,(state,action)=>{
                state.loading=false
                state.error=action.payload
            })

    }
})