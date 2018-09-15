import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {newUser} from '../store/user'
import {withStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import {Signup} from './auth-form'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  menu: {
    width: 200
  }
})

class SignForm extends Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      street: '',
      city: '',
      state: '',
      zip: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  render() {
    const {classes, handleSubmit} = this.props
    return (
      <div>
        <form onSubmit={handleSubmit} className={classes.container}>
          <TextField
            id="firstName"
            label="First Name"
            required
            className={classes.textField}
            value={this.state.firstName}
            onChange={this.handleChange('firstName')}
            margin="normal"
          />
          <TextField
            id="lastName"
            label="Last Name"
            required
            className={classes.textField}
            value={this.state.lastName}
            onChange={this.handleChange('lastName')}
            margin="normal"
          />
          <TextField
            id="email"
            label="@email.com"
            required
            type="email"
            className={classes.email}
            value={this.state.email}
            onChange={this.handleChange('email')}
            margin="normal"
          />
          <TextField
            id="password"
            label="password"
            required
            type="password"
            className={classes.password}
            value={this.state.password}
            onChange={this.handleChange('password')}
            margin="normal"
          />
          <Button variant="contained" type="submit" className={classes.button}>
            SUBMIT
          </Button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const firstName = evt.target.firstName.value
      const lastName = evt.target.lastName.value
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(newUser({firstName, lastName, email, password}))
    }
  }
}


//Updating sign up form after I create the routes

// const mapDispatch = dispatch => {
//   return {
//     handleSubmit(evt) {
//       evt.preventDefault()
//       const street = evt.target.street.value
//       const city = evt.target.city.value
//       const state = evt.target.state.value
//       const zip = evt.target.zip.value
//       dispatch()
//     }
//   }
// }

SignForm.propTypes = {
  classes: PropTypes.object.isRequired
}

// export default connect(null, mapDispatchToProps)(withStyles(styles)(SignForm))
export const UpdatedUser = connect(null, mapDispatchToProps)(withStyles(styles)(SignForm))

//will finish this after routes are updated
// export const UpdatedAddress = connect(null, mapDispatch)(withStyles(styles)(SignForm))
