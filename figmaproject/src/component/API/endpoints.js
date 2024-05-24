import axios from "axios";

const BASE_URL = process.env.REACT_APP_API
const token = localStorage.getItem("token")
console.log(token,'dsfkmdkfs')
const API = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${token}`,
    }

})

export const getPostData = () => API.get('/post')
export const getPostDataById = (id) => API.get(`/post/${id}`);
export const createPost = (formData) => API.post('/post', formData)
export const deletPost = (id) => API.delete(`/post/${id}`)
export const update = (Details, id) => API.put(`/post/${id}`, Details);
export const updateByPatch = (formData, id) => API.patch(`/post/${id}`, formData)
export const blogcomments = (formData, id) => API.post(`/post/${id}/comment`, formData)
export const deletecomment = (id, commentId) => API.delete(`/post/${id}/comment/${commentId}`)
export const getUserProfile = (id) => API.get(`/auth/profile/${id}`)
export const updateprofile = (formData, id) => API.put(`/auth/profile/${id}`, formData)
export const updateprofilephoto = (formData, id) => API.patch(`/auth/profile/${id}`, formData)
export const sendemail = (formData) => API.post(`auth/send-mail`, formData)
export const resetpassword = (formData) => API.post(`auth/reset-password`, formData)
export const filterpost = (title, created_date) => API.get(`/filtered-posts?title=${title}&created_date=${created_date}`)
export const serachpost = (serachText) => API.get(`/search-post?searchText=${serachText}`)