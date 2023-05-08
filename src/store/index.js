import {configureStore} from '@reduxjs/toolkit';
import AuthReducer from '../slice/auth'
import ArticleReducer from '../slice/article'
import SearchReducer from '../slice/search'
import search from '../slice/search';

export default configureStore({
    reducer: {
        auth: AuthReducer,
        article:ArticleReducer,
        search:SearchReducer
    },
    devTools: true
})