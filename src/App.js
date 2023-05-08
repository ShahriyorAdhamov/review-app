import {Route, Routes} from 'react-router-dom'
import Register from './components/app-register';
import Login from './components/login'; 
import Main from './components/app-main'
import Navbar from './components/navbar';

import './App.css';
import { authSlice, signUserSuccess } from './slice/auth';
import AuthService from './services/auth';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ArticleService from './services/articles';
import { getArticlesLoading, getArticlesSuccess,getArticlesFail } from './slice/article';
import ArticleDetail from './components/article-detail';
import CreateArticle from './components/create-article';
import Search from './components/search';
import EditArticle from './components/edit-article';

function App() {
  const dispatch = useDispatch()
  const getUser = async () => {
    try {
      const response = await AuthService.getUser()
      dispatch(signUserSuccess(response.user))
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) {
      getUser()
    }
  },[])


  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path = '/create-article' element={<CreateArticle/>}/>
        <Route path='article/:id' element={<ArticleDetail/>}/>
        <Route path='article/:id' element={<EditArticle/>}/>
      </Routes>
    </div>
  );
}

export default App;
