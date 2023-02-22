import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../reducers/user-reducer'

export const store = configureStore({
  reducer: {
    user: userReducer
  }
})