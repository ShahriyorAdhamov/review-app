import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: 'light__theme'
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        themeChangeSuccess(state, action) {
            state.theme = action.payload
        }
    }
})


export const {themeChangeSuccess} = themeSlice.actions;
export default themeSlice.reducer;