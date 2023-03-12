import { createSlice } from "@reduxjs/toolkit";
import { OnBoard } from "../typings";

const initialState: OnBoard = {
    isOnBoard: true
}

export const onBoardSlice = createSlice({
    name: 'onboard',
    initialState,
    reducers: {
        setOnBoard: (state, action) => {
            state.isOnBoard = action.payload
        }
    }
})

export const { setOnBoard } = onBoardSlice.actions

export const onBoardReducer = onBoardSlice.reducer