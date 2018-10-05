import React, { Component } from 'react'
import propTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { doLogout } from '../actions/user'
import { connect } from 'react-redux'

class Logout extends Component {
  render() {
    this.props.doLogout()
    return (
      <div>
        <Redirect to="/" />
      </div>
    )
  }
}

Logout.propTypes = {
  doLogout: propTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => {
  return {
    doLogout: () => dispatch(doLogout()),
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Logout)
