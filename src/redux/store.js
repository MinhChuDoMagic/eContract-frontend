import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import contractReducer from './cotractSlice'

export default configureStore({
  reducer: {
    user:  userReducer,
    contract: contractReducer,
  },
})