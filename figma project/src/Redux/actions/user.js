import { createAsyncThunk } from "@reduxjs/toolkit";
import { getPostData, getUserProfile, updateprofile,updateprofilephoto,deletPost } from "../../component/API/endpoints";
import { Form } from "react-router-dom";

// export const getUserInfo=createAsyncThunk('user/getUserInfo',async(id)=>{
//     try{
//         const res=await getUserProfile(id)
//         return res.data
//     }catch(err){
//         console.log("error during get user info",err)
//     }
// })

export const getUserInfomation = createAsyncThunk('user/getUserInfo', async (id) => {
    try {
        const res = await getUserProfile(id)
        return res.data
    } catch (err) {
        console.log(err, 'kfgkgdkgd')
    }
})
export const getUpdateInformation= createAsyncThunk('user/updateprofile',async({editsection,userId})=>{
    console.log(editsection,'editsectioneditsection')
    try{
        const res=await updateprofile(editsection,userId)
        return res.data
    }catch(err){
        console.log(err,'hhjj')
    }
})
export const getupdatephoto=createAsyncThunk('user/updateprofilephoto',async({formData,userId})=>{
    try{
        const res=await updateprofilephoto(formData,userId)
        return res.data
    }catch(err){
        console.log(err,'gghhh')
    }
})
export const getdeletepost=createAsyncThunk('user/deletPost',async(id)=>{
    try{
        const res=await deletPost(id)
        return res.data
    }catch(err){
        console.log(err,'gghjhj')
    }
})



