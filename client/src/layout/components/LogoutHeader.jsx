import React from 'react'
import {Link} from 'react-router-dom'
const LogoutHeader = () => {
    function SessionClear() {
        localStorage.removeItem('token');
        sessionStorage.clear()
// document.cookie
         }
  return (
  <Link to="/signUp">  <div onClick={()=> SessionClear()}>Logout</div> </Link>
  )
}

export default LogoutHeader