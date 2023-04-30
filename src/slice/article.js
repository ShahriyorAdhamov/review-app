import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    articles: []

}

export const articlesSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {
        getArticlesLoading(state) {
            state.isLoading = true;
        },
        getArticlesSuccess(state, action) {
            state.isLoading = false;
            state.articles = action.payload;
        },
        getArticlesFail: (state, action) => {
            state.isLoading = false; 
            state.error = action.payload;
        }
    }

})

export const {getArticlesLoading, getArticlesSuccess, getArticlesFail} = articlesSlice.actions;
export default articlesSlice.reducer;