import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.scss";

function Navigation() {
  return (
    <div className={styles.nav}>
      <div className={styles.nav__column}>
        <div className={styles.nav__log}>
          <img src="../../../public/joljak.jpg" alt="logo"/>
        </div>
        <div className={styles.nav__link}>
          <Link to="/">Home</Link>
        </div>
        <div className={styles.nav__link}>
          <Link to="/about">About</Link>
        </div>
      </div>
      <div className={styles.nav__column}>
        <div className={styles.nav__icon}>
          <i class="fas fa-user-alt"></i>
        </div>
        <div className={styles.nav__search}>
          <button>

          </button>
          <input type="text" placeholder="Write a message..." />  
        </div>
      </div>
      
    </div>
  )
}

export default Navigation;