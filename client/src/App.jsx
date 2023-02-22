import Game from './pages/GameNew'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Registration from './pages/Registration'
import { auth } from './actions/user'

function App() {
	const isAuthenticated = useSelector((state) => state.user.isAuthenticated)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(auth)
	}, [])

	return <Game />
}

export default App
