import * as React from "react";
import { Link } from "react-router-dom";
function InputForm() {
  return (
    <div className={"page"}>
      <div className={"container-login"}>
        <div className={"panel"}>
          <div className={"form"}>
            <label for="username">Username</label>
            <input type="name" id={"email"} />
            <label for="password">Password</label>
            <input type="password" id="password" />
            <input type="submit" id="submit" value="Login" />
            <div className="info">
              <Link className="info" to="/RP">
                Sign up
              </Link>
              <a href="" className="info">
                Forgot password
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default InputForm;
