import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.scss";
import { PostsContext } from "../../context/PostsContext";
import { PostsPageInfoContext } from "../../context/PostsPageInfoContext";

function Navigation({props}) {
  const [keyword, setKeyword] = useState();

  const keywordChange = (e) => {
    setKeyword(e.target.value);
  }
  const {setPosts} = useContext(PostsContext);
  const {setPostsPageInfo} = useContext(PostsPageInfoContext);
  const initState = () => {
    setPosts([]);
    setPostsPageInfo({last: false, currentPage: 0, nextPage: 0, total: 0 });
  }

  return (
    <div className={styles.nav}>
      <div className={styles.nav__column}>
        <div className={styles.nav__link}>
          <Link to="/">Home</Link>
        </div>
        <div className={styles.nav__link}>
          <Link to="/posts" onClick={initState}>Post</Link>
        </div>
        <div className={styles.nav__link}>
          <Link to="/about">About</Link>
        </div>
      </div>
      <div className={styles.nav__column}>
        <Link to="/">
          <div className={styles.nav__icon}>
            <i className="fas fa-user-alt"></i>
          </div>
        </Link>
        <div className={styles.nav__search}>
          <Link to={`/posts?keyword=${keyword}`} onClick={initState}>
            <button>
              <i className="fas fa-search 3x"></i>
            </button>
          </Link>
          <input type="text" placeholder="Search" onChange={keywordChange}/>  
        </div>
      </div>
      
    </div>
  )
}

export default Navigation;