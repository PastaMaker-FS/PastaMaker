import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {update} from '../store/user'

const SignForm = props => {
  const {handleSubmit} = props
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstname">
            <small>First Name</small>
          </label>
          <input name="firstname" type="text"/>
        </div>
        <div>
          <label htmlFor="lastname">
            <small>Last Name</small>
          </label>
          <input name="lastname" type="text"/>
        </div>
        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="text"/>
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="text"/>
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  )
}


const mapDispatchToProps = dispatch => {
  return {
    // update: (userId) => dispatch(update(userId)),
    handleSubmit(evt) {
      evt.preventDefault()
      const firstName = evt.target.firstName.value
      const lastName = evt.target.lastName.value
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(update(firstName, lastName, email, password))
    }

  }
}

export default connect(null, mapDispatchToProps)(SignForm)
