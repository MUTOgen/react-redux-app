import React, { Component } from 'react'
import propTypes from 'prop-types'
import { NavLink, withRouter } from 'react-router-dom'
import { doLogin } from '../../actions/user'
import { connect } from 'react-redux'

import './Login.css'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      login: null,
      password: null,
    }
  }

  changeLogin = e => {
    this.setState({ login: e.target.value })
  }
  changePassword = e => {
    this.setState({ password: e.target.value })
  }
  validate(login, password) {
    if (login.trim() === '' || password.trim() === '') {
      alert('Fill the form. All fields are required')
      return false
    }
    return true
  }
  doAuth = e => {
    e.preventDefault()
    let { login, password } = this.state

    if (this.validate(login, password)) {
      this.props.doLogin(login, password, this.props.history)
    }
  }

  render() {
    return (
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={this.doAuth}>
          <p>
            <input
              type="text"
              name="login"
              className="login"
              placeholder="Enter email"
              onChange={this.changeLogin}
            />
          </p>
          <p>
            <input
              type="password"
              name="password"
              className="password"
              placeholder="Enter password"
              onChange={this.changePassword}
            />
          </p>
          <p>
            <button type="submit">Enter</button>
          </p>
        </form>
        <p>
          <NavLink to="/register" activeClassName="active">
            Register
          </NavLink>
        </p>
      </div>
    )
  }
}

Login.propTypes = {
  doLogin: propTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => {
  return {
    doLogin: (login, password, history) =>
      dispatch(doLogin(login, password, history)),
  }
}

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(Login)
)
