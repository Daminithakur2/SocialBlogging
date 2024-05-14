import { createAsyncThunk } from "@reduxjs/toolkit";
import { getPostData,filterpost,createPost,update,getPostDataById,serachpost, blogcomments } from "../../component/API/endpoints";
import { MdDetails } from "react-icons/md";

export const fetchPost = createAsyncThunk('post/fetchPost', async () => {
    try {
        const res = await getPostData()
        return res.data
    } catch (err) {
        console.log(err, 'kfgkgdkgd')
    }
})
export const getAllData=createAsyncThunk('post/filterpost',async({title, created_date})=>{
    try{
        const res=await filterpost(title, created_date)
        return res.data
    }catch(err){
        console.log(err,'gghj')
    }
})
export const getcreatepost=createAsyncThunk('post/createPost',async(newFormData)=>{
    try{
        const res=await createPost(newFormData)
        return res.data
    }catch(err){
        console.log(err,'ghhjj')
    }
})
export const getupdate=createAsyncThunk('post/update',async({updatedetails,id})=>{
    try{
        const res=await update(updatedetails,id)
        return res.data
    }catch(err){
        console.log(err,'ghjk')
    }
})
export const getbyid=createAsyncThunk('post/getPostDataById',async(id)=>{
    try{
        const res=await getPostDataById(id)
        return res.data
    }catch(err){
        console.log(err,'ghjkh')
    }
})
export const getserachpost=createAsyncThunk('post/serachpost',async(text)=>{
    try{
        const res=await serachpost(text)
        return res.data
    }catch(err){
        console.log(err,'gghju')
    }
})

export const postComments = createAsyncThunk('post/postComments',async ({text,blogid}) => {
    try{
        const res = await blogcomments(text,blogid)
        return res.data
    }catch(err){
        console.log('djfjffj')
    }
})





