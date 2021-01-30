import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.scss";

function Navigation() {
  const [keyword, setKeyword] = useState();

  const keywordChange = (e) => {
    setKeyword(e.target.value);
  }
  const searchButtonClick = () => {
    const url = `/posts?keyword=${keyword === undefined ? '' : keyword}`;
    console.log(url)
    document.location.href=url;
        
  }

  return (
    <div className={styles.nav}>
      <div className={styles.nav__column}>
        <div className={styles.nav__link}>
          <Link to="/">Home</Link>
        </div>
        <div className={styles.nav__link}>
          <Link to="/posts">Post</Link>
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
          <button onClick={searchButtonClick}>
            <i className="fas fa-search 3x"></i>
          </button>
          <input type="text" placeholder="Search" onChange={keywordChange}/>  
        </div>
      </div>
      
    </div>
  )
}

export default Navigation;