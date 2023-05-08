import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchTxt: null
}

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        searchTxtContainer(state, action) {
            state.searchTxt = action.payload;
        }
    }
})


export const {searchTxtContainer} = searchSlice.actions;
export default searchSlice.reducer;
