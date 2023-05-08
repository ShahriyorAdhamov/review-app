import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    articles: [],
    articleDetail:null

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
        },
        //article-detail
        getArticleDetailLoading(state) {
            state.isLoading = true;
        },
        getArticleDetailSuccess(state, action) {
            state.isLoading = false;
            state.articleDetail = action.payload;
        },
        getArticleDetailFail: (state) => {
            state.isLoading = false; 

        },
        postArticleLoading(state) {
            state.isLoading = true;
        },
        postArticleSuccess(state, action) {
            state.isLoading = false;
        },
        postArticleFail: (state) => {
            state.isLoading = false; 

        }

    }

})

export const {getArticlesLoading, getArticlesSuccess, getArticlesFail,getArticleDetailFail,getArticleDetailLoading,getArticleDetailSuccess,
postArticleFail, postArticleLoading, postArticleSuccess} = articlesSlice.actions;
export default articlesSlice.reducer;