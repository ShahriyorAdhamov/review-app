import React, { useState, useEffect} from 'react'
import ArticleService from '../services/articles';
import { useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getArticleDetailFail, getArticleDetailLoading, getArticleDetailSuccess } from '../slice/article';
import { postArticleFail, postArticleLoading, postArticleSuccess } from '../slice/article';

const EditArticle = e => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} = useParams();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [body, setBody] = useState('');


  
  const getArticleDetail = async () => {
    dispatch(getArticleDetailLoading());
    try {
      const response = await ArticleService.getArticleDetail(id);
      setTitle(response.article.title)
      setBody(response.article.body);
      setDescription(response.article.description);
      dispatch(getArticleDetailSuccess(response.article))
    } catch(error) {
      dispatch(getArticleDetailFail(error));
    }
  }

  useEffect(() => {
    getArticleDetail();
  },[id])

  const submitArticle = async (e) => {
    e.preventDefault();
    const data = {title, description, body};
    dispatch(postArticleLoading());
    try{

      await ArticleService.editArticle(id, data);
      dispatch(postArticleSuccess())
      getArticleDetail();
      navigate('/');
    } catch(error) {
      dispatch(postArticleFail());
    }}

  return (
    <div>
      <h2>Edit</h2>
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
          <button type = "submit" className='mx-auto w-75 btn btn-primary mb-2' onClick={submitArticle}>
              Edit
          </button>
      </form>
    </div>
  )
}

export default EditArticle