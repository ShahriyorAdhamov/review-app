import {Route, Routes} from 'react-router-dom'
import Register from './components/app-register';
import Login from './components/login'; 
import Main from './components/app-main'
import Navbar from './components/navbar';

import './App.css';
import AuthService from './services/auth';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ArticleDetail from './components/article-detail';
import CreateArticle from './components/create-article';
import EditArticle from './components/edit-article';
import { signUserSuccess } from './slice/auth';
import UserSettings from './components/user-settings';

function App() {
  const dispatch = useDispatch()
  const {theme} = useSelector(state => state.theme)
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

  const classNames = 'text-center vh-100 ' + theme
  return (
    <div className= {classNames} >
      <Navbar/>
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path = '/create-article' element={<CreateArticle/>}/>
        <Route path='article/:id' element={<ArticleDetail/>}/>
        <Route path='edit-article/:id' element={<EditArticle/>}/>
        <Route path='user-settings' element={<UserSettings/>}/>
      </Routes> 
    </div>
  );
}

export default App;
