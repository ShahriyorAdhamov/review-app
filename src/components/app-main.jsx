import { useSelector } from "react-redux";
import Loader from "../ui/loader";
import ArticleService from "../services/articles";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getArticlesFail, getArticlesLoading, getArticlesSuccess } from "../slice/article";
import { useNavigate } from "react-router-dom";
import Search from "./search";

function Main() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {isLoading, articles} = useSelector(state => state.article);
  const {searchTxt} = useSelector(state => state.search)
  const {user, isLogin} = useSelector(state => state.auth)

    const getArticles = async () => {
      dispatch(getArticlesLoading());
      try {
        const response = await ArticleService.getArticles();
        dispatch(getArticlesSuccess(response.articles));
      } catch(error) {
        dispatch(getArticlesFail(error));
      }
    }

    const deleteArticle = async (slug) => {
      try {
        await ArticleService.deleteArticle(slug)
        getArticles();
      }catch(error) {
        console.log(error)
      }
    }

    useEffect(() => {
      getArticles();
    },[])

    let filteredData = articles;
    if(searchTxt){

        const searchFilter = (searchTxt, articles) =>         articles.filter(item => item.title.toLowerCase().indexOf(searchTxt) > -1 );
  
        filteredData = searchFilter(searchTxt, articles);
    }


    


    return (
      <div>
        <Search/>
        <div className="album py-5 bg-light">
      <div className="container">

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {filteredData.map(
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
                    {isLogin && (user.username == item.author.username) && (
                      <>
                        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => navigate(`article/${item.slug}`)}>Edit</button>
                        <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => deleteArticle(item.slug)}>Delete</button>
                      </>
                    )}
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