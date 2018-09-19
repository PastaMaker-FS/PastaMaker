import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {newUser, update} from '../store/user'
import {withStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import {Signup} from './auth-form'
import states from './states'
import AlertDialog from './error'
import Card from '@material-ui/core/Card'

const styles = theme => ({
  contain: {
    position: 'fixed',
    top: '30vh',
    left: '35vw',
    boxShadow: '0 6px 20px 0 rgba(0, 0, 0, 0.7)'
  },
  button: {
    position: "relative",
    top:10,
    left: 300,
    margin: theme.spacing.unit
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  form: {
    margin: 0
  },
  card: {
    maxWidth: 650
  },
  loginDiv: {
    textAlign: 'center',
    backgroundColor: '#F58F29',
    height: 50
  },
  login: {
    position: 'relative',
    top: 15,
    color: 'white'
  }
})

class SignForm extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
      street: '',
      city: '',
      state: '',
      zip: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = label => event => {
    this.setState({
      [label]: event.target.value
    })
  }

  render() {
    const {classes, handleSubmit} = this.props
    return (
      <React.Fragment>
        <div className="background" />
        <div className={classes.contain}>
          <Card className={classes.card}>
            <div className={classes.loginDiv}>
              <div className={classes.login}>Sign Up</div>
            </div>
            <div>
              <form onSubmit={handleSubmit} className={classes.container}>
                <TextField
                  id="name"
                  label="Name"
                  required
                  className={classes.textField}
                  value={this.state.name}
                  onChange={this.handleChange('name')}
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
                <TextField
                  id="street"
                  label="Street"
                  required
                  className={classes.textField}
                  value={this.state.street}
                  onChange={this.handleChange('street')}
                  margin="normal"
                />
                <TextField
                  id="city"
                  label="City"
                  required
                  className={classes.textField}
                  value={this.state.city}
                  onChange={this.handleChange('city')}
                  margin="normal"
                />
                <TextField
                  id="state"
                  label="State"
                  required
                  select
                  className={classes.textField}
                  value={this.state.state}
                  onChange={this.handleChange('state')}
                  margin="normal"
                >
                  {states.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.value}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  id="zip"
                  label="Zip"
                  required
                  className={classes.textField}
                  value={this.state.zip}
                  onChange={this.handleChange('zip')}
                  margin="normal"
                />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className={classes.button}
                >
                  SUBMIT
                </Button>
              </form>
              {this.props.message === 'User Already Exists!' ? (
                <h1>
                  <AlertDialog />
                </h1>
              ) : null}
            </div>
          </Card>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    newUser: state.user.user,
    message: state.user.message
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const name = evt.target.name.value
      const email = evt.target.email.value
      const password = evt.target.password.value
      const street = evt.target.street.value
      const city = evt.target.city.value
      const state = evt.target.state.value
      const zip = evt.target.zip.value
      dispatch(
        newUser({
          name,
          email,
          password,
          street,
          city,
          state,
          zip
        })
      )
    }
  }
}
const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const name = evt.target.lastName.value
      const email = evt.target.email.value
      const password = evt.target.password.value
      const street = evt.target.street.value
      const city = evt.target.city.value
      const state = evt.target.state.value
      const zip = evt.target.zip.value
      dispatch(
        update({
          name,
          email,
          password,
          street,
          city,
          state,
          zip
        })
      )
    }
  }
}

export const UserSign = connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(SignForm)
)
export const UserUpdate = connect(null, mapDispatch)(
  withStyles(styles)(SignForm)
)

SignForm.propTypes = {
  classes: PropTypes.object.isRequired
}
