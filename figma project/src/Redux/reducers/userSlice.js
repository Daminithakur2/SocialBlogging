import { createSlice } from "@reduxjs/toolkit";
import { getUserInfomation } from "../actions/user";
const initialState = {
    userInfo: [],
    loading: false,
    error: null
}
export const userSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUserInfomation.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getUserInfomation.fulfilled, (state, action) => {
            state.loading = false
            state.userInfo = action.payload
        })
        builder.addCase(getUserInfomation.rejected, (state, action) => {
            state.loading = false
            state.error = action.error
        })
    }
})

