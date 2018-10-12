import React, { Component } from 'react'
import { NavLink, Route, Switch, Redirect, withRouter } from 'react-router-dom'
import Home from '../../components/Home'
import Login from '../Login/Login'
import { doLogout } from '../../actions/user'
import Admin from '../../components/Admin/Admin'
import Register from '../Register/Register'
import logo from '../../logo.svg'
import { connect } from 'react-redux'
import './App.css'

class App extends Component {
  handleLogout = e => {
    e.preventDefault()
    this.props.doLogout()
  }

  render() {
    let user = this.props.user.login
    return (
      <div className="app">
        <header className="app-header">
          <img src={logo} className="app-logo" alt="logo" />
        </header>
        <ul className="menu">
          {user !== undefined && (
            <li>
              <NavLink exact to="/" activeClassName="active">
                Home
              </NavLink>
            </li>
          )}
          {user === 'admin' && (
            <li>
              <NavLink to="/admin" activeClassName="active">
                Admin
              </NavLink>
            </li>
          )}
          {user === undefined && (
            <li>
              <NavLink to="/login" activeClassName="active">
                Login
              </NavLink>
            </li>
          )}
          {user !== undefined && (
            <li>
              <NavLink
                to="/logout"
                onClick={this.handleLogout}
                activeClassName="active"
              >
                Logout
              </NavLink>
            </li>
          )}
        </ul>
        <div className="app-content">
          <Switch>
            <Route
              exact
              path="/"
              render={() =>
                user !== undefined ? <Home /> : <Redirect to="/login" />
              }
            />
            <Route
              path="/login"
              render={() =>
                user === undefined ? <Login /> : <Redirect to="/" />
              }
            />
            <Route
              path="/register"
              render={() =>
                user === undefined ? <Register /> : <Redirect to="/" />
              }
            />
            <Route
              path="/admin"
              render={() =>
                user !== undefined && user === 'admin' ? (
                  <Admin />
                ) : (
                  <Redirect to="/" />
                )
              }
            />
          </Switch>
        </div>
      </div>
    )
  }
}

const mapStateToProps = store => {
  return {
    user: store.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doLogout: () => dispatch(doLogout()),
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
)
