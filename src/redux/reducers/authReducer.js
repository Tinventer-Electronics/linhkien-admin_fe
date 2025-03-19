import { createSlice } from "@reduxjs/toolkit";

const authSlide = createSlice({
    name: "auth",
    initialState: {
        data: {
            token: "",
            _id: "",
        },
    },
    reducers: {
        addAuth: (state, action) => {
            state.data = action.payload;
        },
        removeAuth: (state) => {
            state.data = {
                token: "",
                _id: "",
            };
        },
    },
});

export const authReducer = authSlide.reducer;
export const { addAuth, removeAuth } = authSlide.actions;
export const authSelector = (state) => state.authReducer.data;
