import React, { useState } from 'react'
import ArticleService from '../services/articles';
import { postArticleFail, postArticleLoading, postArticleSuccess } from '../slice/article';
import { useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';

const CreateArticle = e => {
  // e.preventDefault();
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [body, setBody] = useState('');

  function  submitArticle() {
    const article = {title, description, body};
    dispatch(postArticleLoading())
    try{
      dispatch(postArticleSuccess())
      const response = ArticleService.postArticle(article);
      navigate('/')
    } catch(error) {
      dispatch(postArticleFail())
      console.log(error)
    }
    
  }


  return (
    <div>
      <h2>Create</h2>
      <form action="">
          <input 
              type = "text"
              className='mx-auto w-75 form-control border border-primary mb-2'
              placeholder="title"
              value={title}
              onChange={e => setTitle(e.target.value)}/>

          <textarea 
              type = "text"
              className='mx-auto w-75 h-50 form-control border border-primary mb-2 '
              placeholder="description"
              value={description}
              onChange={e => setDescription(e.target.value)}/>
          <textarea 
              type = "text"
              className='h-75 d-inline-block mx-auto w-75 form-control border border-primary mb-2 '
              placeholder="body"
              value={body}
              onChange={e => setBody(e.target.value)}/>
          <button type = "submit" className='mx-auto w-75 btn btn-primary mb-2' onClick={() => submitArticle()}>
              Create
          </button>
      </form>
    </div>
  )
}

export default CreateArticle