import React, { Component } from 'react'
import { connect } from 'react-redux'
import Validator from '../helpers/Validator'
import { doCreateRow } from '../actions/userTable'

class AddUserForm extends Component {
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

  doAdd = e => {
    e.preventDefault()
    let { login, password, repassword } = this.state

    if (
      login.trim() === '' ||
      password.trim() === '' ||
      repassword.trim() === ''
    ) {
      alert('Fill the form. All fields are required')
      return
    }

    if (!Validator.isEmail(login)) {
      alert('Email is not valid')
      return
    }

    if (password !== repassword) {
      alert('Passwords are not matched')
      return
    }

    this.props.doAdd(login, password)
    this.setState({ login: '', password: '', repassword: '' })
    alert('New item added!')
  }

  render() {
    let { login, password, repassword } = this.state
    return (
      <div className="add-form">
        <h2>Add user</h2>
        <form onSubmit={this.doAdd}>
          <p>
            <input
              type="text"
              name="login"
              className="login"
              value={login}
              onChange={this.changeLogin}
              placeholder="Enter new email"
            />
          </p>
          <p>
            <input
              type="password"
              name="password"
              className="password"
              value={password}
              onChange={this.changePassword}
              placeholder="Enter new password"
            />
          </p>
          <p>
            <input
              type="password"
              name="re-password"
              className="re-password"
              value={repassword}
              onChange={this.changeRePassword}
              placeholder="Repeat password"
            />
          </p>
          <p>
            <button type="submit">Save</button>
          </p>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doAdd: (login, password) => dispatch(doCreateRow(login, password)),
  }
}

export default connect(
  null,
  mapDispatchToProps
)(AddUserForm)
