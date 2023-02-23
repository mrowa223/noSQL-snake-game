import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../reducers/user'
import leaderboardReducer from '../reducers/leaderboard'

export const store = configureStore({
  reducer: {
    user: userReducer,
    leaderboard: leaderboardReducer
  }
})