import {
  REQUEST_USERS_START,
  REQUEST_USERS_FAIL,
  REQUEST_USERS_SUCCESS,
  UPDATE_USERS_FAIL,
  UPDATE_USERS_SUCCESS,
  UPDATE_USERS_START,
  DELETE_USERS_FAIL,
  DELETE_USERS_START,
  DELETE_USERS_SUCCESS,
  CREATE_USERS_FAIL,
  CREATE_USERS_START,
  CREATE_USERS_SUCCESS,
} from '../actions/userTable'

const initialState = []

export function userTableReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_USERS_FAIL:
    case UPDATE_USERS_FAIL:
    case DELETE_USERS_FAIL:
    case CREATE_USERS_FAIL:
      alert(action.payload)
      return state
    case REQUEST_USERS_SUCCESS:
    case UPDATE_USERS_SUCCESS:
      return action.payload
    case DELETE_USERS_SUCCESS:
      return state.filter(user => user.id !== action.payload)
    case CREATE_USERS_SUCCESS:
      return [
        ...state,
        {
          id: action.payload.id,
          login: action.payload.login,
          password: action.payload.password,
        },
      ]
    case REQUEST_USERS_START:
    case UPDATE_USERS_START:
    case DELETE_USERS_START:
    case CREATE_USERS_START:
    default:
      return state
  }
}
