import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.scss";

function Navigation() {
  return (
    <div className={styles.nav}>
      <div className={styles.nav__column}>
        <div className={styles.nav__link}>
          <p>게시판</p>
        </div>
        <div className={styles.nav__link}>
          <Link to="/">Home</Link>
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
          <button>
            <i className="fas fa-search 3x"></i>
          </button>
          <input type="text" placeholder="Search" />  
        </div>
      </div>
      
    </div>
  )
}

export default Navigation;