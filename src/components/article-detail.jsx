import React from 'react'
import { useParams } from 'react-router-dom'

function ArticleDetail() {
  const {id} = useParams()  
  return (
    <div>{id}</div>
  )
}

export default ArticleDetail