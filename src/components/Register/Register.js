import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import Validator from '../../helpers/Validator'
import { doRegister } from '../../actions/userTable'

import './Register.css'

class Register extends Component {
  state = {
    login: '',
    password: '',
    repassword: '',
  }

  changeLogin = e => {
    this.setState({ login: e.target.value })
  }

  changePassword = e => {
    this.setState({ password: e.target.value })
  }

  changeRePassword = e => {
    this.setState({ repassword: e.target.value })
  }

  validate(login, password) {
    if (login.trim() === '' || password.trim() === '') {
      alert('Fill the form. All fields are required')
      return false
    }
    return true
  }

  doRegister = e => {
    e.preventDefault()
    let { login, password, repassword } = this.state
    if (!Validator.isEmail(login)) {
      alert('Email is not valid')
      return false
    }
    if (password !== repassword) {
      alert('Passwords are not matched')
      return
    }
    if (this.validate(login, password)) {
      this.props.doRegister(login, password)
      this.setState({ login: '', password: '', repassword: '' })
      alert('Success! Now you can login')
    }
  }

  render() {
    let { login, password, repassword } = this.state
    return (
      <div className="register-form">
        <h2>Registration</h2>
        <form onSubmit={this.doRegister}>
          <p>
            <input
              type="text"
              name="login"
              className="login"
              placeholder="Enter email"
              value={login}
              onChange={this.changeLogin}
            />
          </p>
          <p>
            <input
              type="password"
              name="password"
              className="password"
              placeholder="Enter password"
              value={password}
              onChange={this.changePassword}
            />
          </p>
          <p>
            <input
              type="password"
              name="re-password"
              className="re-password"
              placeholder="Repeat password"
              value={repassword}
              onChange={this.changeRePassword}
            />
          </p>
          <p>
            <button type="submit">Register</button>
          </p>
        </form>
        <p>
          <NavLink to="/login" activeClassName="active">
            Login
          </NavLink>
        </p>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doRegister: (login, password) => dispatch(doRegister(login, password)),
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Register)
