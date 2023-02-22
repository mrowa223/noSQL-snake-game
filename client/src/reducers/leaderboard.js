import { createSlice } from '@reduxjs/toolkit'

const leaderboardSlice = createSlice({
	name: 'leaderboard',
	initialState: {
        current: []
	},
	reducers: {
		set: (state, action) => {
			state.current = action.payload.leaderboard
		}
	}
})

export const { set } = leaderboardSlice.actions

export default leaderboardSlice.reducer
