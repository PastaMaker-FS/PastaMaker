import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import Button from '@material-ui/core/Button'
import {Link} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import TextField from '@material-ui/core/TextField'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  contain: {
    position: 'fixed',
    top: '30vh',
    left: '40vw',
    boxShadow: '0 6px 20px 0 rgba(0, 0, 0, 0.7)'
  },
  form: {
    margin: 0
  },
  card: {
    maxWidth: 350
  },
  media: {
    height: 140
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
  },
  left: {
    marginLeft: 70
  },
  leftB: {
    marginLeft: 50
  },
  imgDiv: {
    marginTop: 10
  }
})

const AuthForm = props => {
  const {name, displayName, handleSubmit, error, classes} = props

  return (
    <React.Fragment>
      <div className="background" />
      <div className={classes.contain}>
        <Card className={classes.card}>
          <div className={classes.loginDiv}>
            <div className={classes.login}>LOGIN</div>
          </div>
          <div>
            <form className={classes.form} onSubmit={handleSubmit} name={name}>
              <div className={classes.left}>
                <TextField
                  id="outlined-email-input"
                  label="email"
                  className={classes.textField}
                  type="email"
                  name="email"
                  autoComplete="email"
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-password-input"
                  label="password"
                  className={classes.textField}
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  margin="normal"
                  variant="outlined"
                />
              </div>
              {error && error.response && <div> {error.response.data} </div>}
              <div className={classes.leftB}>
                <Link to="/signup">
                  <Button
                    variant="outlined"
                    color="primary"
                    className={classes.button}
                  >
                    Sign Up
                  </Button>
                </Link>
                <Button
                  variant="outlined"
                  color="primary"
                  className={classes.button}
                  type="submit"
                >
                  {displayName}
                </Button>
                <div className="imgDiv">
                  <a href="/auth/google">
                    <img
                      src="https://i.imgur.com/RS0U5Nm.png"
                      className="imgG"
                    />
                  </a>
                </div>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </React.Fragment>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      console.log(evt)
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(
  withStyles(styles)(AuthForm)
)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
  classes: PropTypes.object.isRequired
}
