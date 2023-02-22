import React from "react";
import { Link } from "react-router-dom";
// import snake from '../source/img/snake.png'

const NotFound = (props) => {
  return (
    <div class="container-error">
      <h2>404</h2>
      <h1>PAGE NOT FOUND</h1>
      <img src={props} alt="1" />
      <Link className="home-link" to="/">
        GO HOME PAGE
      </Link>
    </div>
  );
};

export default NotFound;
