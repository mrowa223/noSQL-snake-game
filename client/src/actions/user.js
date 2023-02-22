import axios from 'axios'
import { setUser } from '../reducers/user-reducer'

export const signup = async (email, username, password) => {
	try {
		const response = await axios.post('http://localhost:4000/api/auth/register', {
			email,
			username,
			password
		})

		alert(response.data.message)
	} catch (e) {
		alert(e.response.data.message)
	}
}

export const login = (username, password) => {
	return async (dispatch) => {
		try {
			const response = await axios.post('http://localhost:4000/api/auth/login', {
				username,
				password
			})
			dispatch(setUser(response.data.user))
			localStorage.setItem('token', response.data.token)

			console.log(response.data)
		} catch (e) {
			alert(e.response.data.message)
		}
	}
}

export const auth = () => {
	return async (dispatch) => {
		try {
			const response = await axios.get('http://localhost:4000/api/auth/auth', {
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
			})
			dispatch(setUser(response.data.user))
            
			localStorage.setItem('token', response.data.token)
		} catch (e) {
			alert(e.response.data.message)
            localStorage.removeItem('token')
		}
	}
}


