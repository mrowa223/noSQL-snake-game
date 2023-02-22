import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
	name: 'user',
	initialState: {
        currentUser: {},
        isAuthenticated: false
	},
	reducers: {
		setUser: (state, action) => {
			state.currentUser = action.payload.user
			state.isAuthenticated = true
		},
		logout: state => {
			localStorage.removeItem('token')
			state.currentUser = {}
			state.isAuthenticated = false
		}
	}
})

export const { setUser, logout } = userSlice.actions

export default userSlice.reducer
