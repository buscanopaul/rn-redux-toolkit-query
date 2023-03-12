import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogin: true,
    test: true
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserIsLogin: (state, action) => {
            state.isLogin = action.payload
        },
        setTest: (state, action) => {
            state.test = action.payload
        }
    }
})

export const { setUserIsLogin, setTest } = userSlice.actions

export const userReducer = userSlice.reducer