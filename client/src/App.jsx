import Game from './pages/GameNew'
import Login from './pages/Login'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { auth } from './actions/user.js'

function App() {
	const dispatch = useDispatch()
	const isAuthenticated = useSelector((state) => state.user.isAuthenticated)
	console.log(isAuthenticated)

	useEffect(() => {
		dispatch(auth())
	}, [])

	return <div>{isAuthenticated ? <Game /> : <Login />}</div>
}

export default App
