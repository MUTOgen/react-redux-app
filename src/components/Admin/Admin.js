import React, { Component } from 'react'
import Table from '../../containers/Table'
import './Admin.css'

export default class Admin extends Component {
  render() {
    return (
      <div className="admin-page">
        <Table perPage={5} />
      </div>
    )
  }
}
