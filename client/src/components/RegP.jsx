import React from 'react'
import { Link } from "react-router-dom";
 function InputForm() {
  return (
    <div class="page">
      <div class="container-reg">
        <div class="panel">
          <div class="form">
            <label for="username">Username</label>
            <input type="name" id="email" />
            <label for="password">Password</label>
            <input type="password" id="password" />
            <label for="password-confirm">Confirm password</label>
            <input type="password" id="password-confirm" />
            <input type="submit" id="submit" value="Sign up" />
            <div class="info">
              {/* <a href="login.html" class="info">Login</a> */}
              <Link className="info" to="/LP">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default InputForm;