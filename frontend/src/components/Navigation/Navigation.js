import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.scss";

function Navigation() {
  return (
    <div className="">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </div>
  )
}

export default Navigation;