import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogin: true
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserIsLogin: (state, action) => {
            state.isLogin = action.payload
        }
    }
})

export const { setUserIsLogin } = userSlice.actions

export const userReducer = userSlice.reducer