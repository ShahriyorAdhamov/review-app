import { useSelector } from "react-redux";
import Loader from "../ui/loader";
import ArticleService from "../services/articles";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getArticlesFail, getArticlesLoading, getArticlesSuccess } from "../slice/article";
import { useNavigate } from "react-router-dom";

function Main() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {isLoading, articles} = useSelector(state => state.article);

    const getArticles = async () => {
      dispatch(getArticlesLoading());
      try {
        const response = await ArticleService.getArticles();
        dispatch(getArticlesSuccess(response.articles));
      } catch(error) {
        dispatch(getArticlesFail(error));
      }
    }

    useEffect(() => {
      getArticles();
    },[])
    return (
      <div>
        <div className="album py-5 bg-light">
      <div className="container">

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {articles.map(
          item =>(
          <div className="col" key={item.id}>
            <div className="card shadow-sm h-100">
              <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em"></text></svg>

              <div className="card-body">
                <p className="card-text fw-bold">{item.title}</p>
                <p className="card-text">{item.description}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="btn-group">
                    <button type="button" className="btn btn-sm btn-outline-success" onClick={() => navigate(`article/${item.slug}`)}>View</button>
                    <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                    <button type="button" className="btn btn-sm btn-outline-danger">Delete</button>
                  </div>
                  <small className="text-muted text-capitalize">{item.author.username}</small>
                </div>
              </div>
            </div>
          </div>
          )
        )}
        </div>
      </div>
    </div>
      {isLoading && <Loader />}
      </div>
    )}

    export default Main;