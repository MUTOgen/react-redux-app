import axios from 'axios'
import Auth from '../helpers/Auth'

export const REQUEST_USERS_START = 'request_users_start'
export const REQUEST_USERS_SUCCESS = 'request_users_success'
export const REQUEST_USERS_FAIL = 'request_users_fail'

export const UPDATE_USERS_START = 'update_users_start'
export const UPDATE_USERS_SUCCESS = 'update_users_success'
export const UPDATE_USERS_FAIL = 'update_users_fail'

export const DELETE_USERS_START = 'delete_users_start'
export const DELETE_USERS_SUCCESS = 'delete_users_success'
export const DELETE_USERS_FAIL = 'delete_users_fail'

export const CREATE_USERS_START = 'create_users_start'
export const CREATE_USERS_SUCCESS = 'create_users_success'
export const CREATE_USERS_FAIL = 'create_users_fail'

export const REGISTER_USERS_START = 'register_users_start'
export const REGISTER_USERS_SUCCESS = 'register_users_success'
export const REGISTER_USERS_FAIL = 'register_users_fail'

export function doLoad() {
  return dispatch => {
    dispatch({
      type: REQUEST_USERS_START,
    })

    const token = Auth.getToken()
    axios
      .get(`https://us-club.pw/api/list.php?token=${token}`)
      .then(response => {
        const data = response.data
        if ('error' in data) {
          dispatch({
            type: REQUEST_USERS_FAIL,
            payload: data.error,
          })
        } else {
          dispatch({
            type: REQUEST_USERS_SUCCESS,
            payload: data,
          })
        }
      })
  }
}

export function doDeleteRow(id) {
  return dispatch => {
    dispatch({
      type: DELETE_USERS_START,
    })

    const token = Auth.getToken()
    axios
      .get(`https://us-club.pw/api/delete.php?id=${id}&token=${token}`)
      .then(response => {
        const data = response.data
        if ('error' in data) {
          dispatch({
            type: DELETE_USERS_FAIL,
            payload: data.error,
          })
        } else {
          dispatch({
            type: DELETE_USERS_SUCCESS,
            payload: data.item.id,
          })
        }
      })
  }
}

export function doUpdateRow(id, login, password) {
  return dispatch => {
    dispatch({
      type: UPDATE_USERS_START,
    })

    const token = Auth.getToken()
    axios
      .get(
        `https://us-club.pw/api/edit.php?id=${id}&login=${login}&password=${password}&token=${token}`
      )
      .then(response => {
        const data = response.data
        if ('error' in data) {
          dispatch({
            type: UPDATE_USERS_FAIL,
            payload: data.error,
          })
        } else {
          dispatch({
            type: UPDATE_USERS_SUCCESS,
            payload: data.items,
          })
        }
      })
  }
}

export function doCreateRow(login, password) {
  return dispatch => {
    dispatch({
      type: CREATE_USERS_START,
    })

    axios
      .get(`https://us-club.pw/api/add.php?login=${login}&password=${password}`)
      .then(response => {
        let data = response.data
        if (data.status === 'error') {
          dispatch({
            type: CREATE_USERS_FAIL,
            payload: data.error,
          })
        }
        if (data.status === 'ok') {
          dispatch({
            type: CREATE_USERS_SUCCESS,
            payload: {
              id: data.item.id,
              login: data.item.login,
              password: data.item.password,
            },
          })
        }
      })
  }
}

export function doRegister(login, password) {
  return dispatch => {
    dispatch({
      type: REGISTER_USERS_START,
    })

    axios
      .get(`https://us-club.pw/api/add.php?login=${login}&password=${password}`)
      .then(response => {
        let data = response.data
        if (data.status === 'error') {
          dispatch({
            type: REGISTER_USERS_FAIL,
            payload: data.error,
          })
        }
        if (data.status === 'ok') {
          dispatch({
            type: REGISTER_USERS_SUCCESS,
          })
        }
      })
  }
}
