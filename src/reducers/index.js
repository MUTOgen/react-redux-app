import { combineReducers } from 'redux'
import { userReducer } from './user'
import { userTableReducer } from './userTable'

export const rootReducer = combineReducers({
  user: userReducer,
  userTable: userTableReducer,
})
