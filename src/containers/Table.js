import React, { Component } from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import TableRow from '../components/TableRow'
import AddUserForm from '../components/AddUserForm'
import Pagination from '../components/Pagination'
import { doLoad } from '../actions/userTable'

class Table extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 1,
      filter: null,
    }
  }

  changePage = new_page => {
    this.setState({ page: new_page })
  }

  filterChange = e => {
    this.setState({ filter: e.target.value, page: 1 })
  }

  doFilter = () => {
    let filter = this.state.filter
    let filtered = this.props.users.filter(user => {
      return (
        filter === null ||
        filter.length === 0 ||
        user.id.toString().indexOf(filter) !== -1 ||
        user.login.indexOf(filter) !== -1
      )
    })

    return filtered
  }

  componentDidMount() {
    this.props.doLoad()
  }

  render() {
    const { page } = this.state
    const perPage = this.props.perPage
    const filterUsers = this.doFilter()
    const rows = filterUsers
      .slice((page - 1) * perPage, page * perPage)
      .map(item => <TableRow key={item.id.toString()} data={item} />)

    return (
      <div className="user-table">
        <AddUserForm />
        {this.props.users.length ? (
          <div className="table">
            <div className="filter-container">
              <input
                type="text"
                className="filter"
                name="filter"
                onChange={this.filterChange}
                placeholder="Search rows in table"
              />
            </div>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Controls</th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </table>
            <Pagination
              page={page}
              perPage={perPage}
              total={filterUsers.length}
              pages={Math.ceil(filterUsers.length / perPage)}
              onChangePage={this.changePage}
            />
          </div>
        ) : (
          <p>Loading data...</p>
        )}
      </div>
    )
  }
}

Table.propTypes = {
  perPage: propTypes.number.isRequired,
  users: propTypes.array.isRequired,
}

const mapStateToProps = store => {
  return {
    users: store.userTable,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doLoad: () => dispatch(doLoad()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Table)
