import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
	name: 'user',
	initialState: {
        currentUser: {},
        isAuthenticated: false
	},
	reducers: {
	}
})

export default userSlice.reducer
