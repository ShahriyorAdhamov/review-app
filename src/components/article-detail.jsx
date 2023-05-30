import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import ArticleService from '../services/articles';
import { getArticleDetailFail, getArticleDetailLoading, getArticleDetailSuccess } from '../slice/article';

const ArticleDetail = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {articleDetailParams} = useSelector(state => state.article);
 

  const getArticleDetail = async () => {
    dispatch(getArticleDetailLoading());
    try {
      const response = await ArticleService.getArticleDetail(id);
      dispatch(getArticleDetailSuccess(response.article))
    } catch(error) {
      dispatch(getArticleDetailFail(error));
    }
  }

  useEffect(() => {
    getArticleDetail()
  },[id])

  return (
    <div className='d-flex justify-content-between container mx-auto'>
      {articleDetailParams? 
      <div>
        <h2>{articleDetailParams.title}</h2>
        <p>{articleDetailParams.description}</p>

      </div>
      :
      ''
      }
    </div>
  )
}

export default ArticleDetail