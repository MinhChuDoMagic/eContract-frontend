import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import contractReducer from './cotractSlice'
import readReducer from './readSlice'
import signReducer from './signSlice'

export default configureStore({
  reducer: {
    user:  userReducer,
    contract: contractReducer,
    read: readReducer,
    sign: signReducer,
  },
})