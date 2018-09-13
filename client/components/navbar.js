import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {withStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    color: "red"
  },
  input: {
    display: 'none'
  }
})

const Navbar = ({handleClick, isLoggedIn, classes}) => {
  return (
    <div>
      <h1>PastaMaker</h1>
      <nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/">
              <Button
                variant="outlined"
                color="primary"
                className={classes.button}
              >
                Home
              </Button>
            </Link>
            <a href="#" onClick={handleClick}>
              <Button
                variant="outlined"
                color="primary"
                className={classes.button}
              >
                Logout
              </Button>
            </a>
            <Link to="/user">
              <Button
                variant="outlined"
                color="primary"
                className={classes.button}
              >
                User Info
              </Button>
            </Link>
            <Link to="/aboutus">
              <Button
                variant="outlined"
                color="primary"
                className={classes.button}
              >
                About Us
              </Button>
            </Link>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/">
              <Button
                variant="outlined"
                color="primary"
                className={classes.button}
              >
                Home
              </Button>
            </Link>
            <Link to="/login">
              <Button
                variant="outlined"
                color="primary"
                className={classes.button}
              >
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button
                variant="outlined"
                color="primary"
                className={classes.button}
              >
                Sign Up
              </Button>
            </Link>
            <Link to="/aboutus">
              <Button
                variant="outlined"
                color="primary"
                className={classes.button}
              >
                About Us
              </Button>
            </Link>
          </div>
        )}
      </nav>
      <hr />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(withStyles(styles)(Navbar))

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired
}
