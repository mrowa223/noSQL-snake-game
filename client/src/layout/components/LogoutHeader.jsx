import React from 'react'
import {Link} from 'react-router-dom'
import { logoutUser } from '../../actions/user'
import { useDispatch } from 'react-redux'

const LogoutHeader = () => {
	const dispatch = useDispatch()

  return (
  <Link to="/signUp">  <div onClick={()=> dispatch(logoutUser())}>Logout</div> </Link>
  )
}

export default LogoutHeader