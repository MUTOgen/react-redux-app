import axios from 'axios'
import Auth from '../helpers/Auth'

export const REQUEST_LOGIN_START = 'request_login_start'
export const REQUEST_LOGIN_SUCCESS = 'request_login_success'
export const REQUEST_LOGIN_FAIL = 'request_login_fail'
export const LOGOUT = 'logout'

export function doLogin(login, password, history) {
  return dispatch => {
    dispatch({
      type: REQUEST_LOGIN_START,
      payload: {
        login: login,
        password: password,
      },
    })

    axios
      .get(
        `https://us-club.pw/api/login.php?login=${login}&password=${password}`
      )
      .then(response => {
        let data = response.data
        if (data.status === 'error') {
          dispatch({
            type: REQUEST_LOGIN_FAIL,
            payload: data.error,
          })
        }
        if (data.status === 'ok') {
          dispatch({
            type: REQUEST_LOGIN_SUCCESS,
            payload: {
              login: login,
              token: data.item.token,
            },
          })
          Auth.putUser(login, data.item.token)
          history.push('/')
        }
      })
  }
}

export function doLogout() {
  Auth.removeUser()
  return {
    type: LOGOUT,
    payload: {
      login: undefined,
      token: undefined,
    },
  }
}
