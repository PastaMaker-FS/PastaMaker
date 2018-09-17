import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {OrderHistory, Cart} from '../components'

export const UserHome = props => {
  const {firstName, lastName, email} = props

  return (
    <div>
      <h3>Welcome, {firstName} {lastName}</h3>
      <h3>{email}</h3>
      <Cart />
      <OrderHistory />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    firstName: state.user.firstName,
    lastName: state.user.lastName,
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
