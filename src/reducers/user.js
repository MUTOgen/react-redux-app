import {
  REQUEST_LOGIN_START,
  REQUEST_LOGIN_FAIL,
  REQUEST_LOGIN_SUCCESS,
  LOGOUT,
} from '../actions/user'
import Auth from '../helpers/Auth'

const initialState = {
  login: Auth.getUser(),
  token: Auth.getToken(),
}

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_LOGIN_FAIL:
      alert(action.payload)
      return state
    case REQUEST_LOGIN_SUCCESS:
      return { login: action.payload.login, token: action.payload.token }
    case LOGOUT:
      return { login: action.payload.login, token: action.payload.token }
    case REQUEST_LOGIN_START:
    default:
      return state
  }
}
