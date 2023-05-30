import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogin: false,
    user: null,
    error: null,
    isLoading:false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

        //login and Register
        signUserLoading: (state) => {
            state.isLoading = true;
        },
        signUserSuccess: (state, action) => {
            state.isLoading = false;
            state.isLogin = true;
            state.user = action.payload;
            localStorage.setItem('token',action.payload.token)
        },
        signUserFail: (state, action) => {
            state.isLoading = false; 
            state.error = action.payload;
        },
        userLogout:(state) => {
            state.isLogin = false;
            state.user = null;
        },
        userUpdatedInfo:(state, action) => {
            state.user = action.payload
        }
    }

})

export const {userUpdatedInfo, signUserSuccess,signUserFail, signUserLoading,userLogout, getPassword} = authSlice.actions;
export default authSlice.reducer