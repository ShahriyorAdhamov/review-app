import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import ArticleService from '../services/articles';
import { getArticleDetailFail, getArticleDetailLoading, getArticleDetailSuccess } from '../slice/article';

function ArticleDetail() {
  const {id} = useParams();
  const dispatch = useDispatch();
  const {ArticleDetail} = useSelector(state => state.article);


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
    <div>
      <h1>{id}</h1>
    </div>
  )
}

export default ArticleDetail