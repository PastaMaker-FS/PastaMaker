import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {withStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    color: 'white'
  },
  input: {
    display: 'none'
  },
  img: {
    maxHeight: 80,
    maxWidth: 80
  },
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
})

const Navbar = ({handleClick, isLoggedIn, classes}) => {
  return (
    <div>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="title"
              color="inherit"
              className={classes.grow}
            >
              News
            </Typography>

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
                <Link to="/allproducts">
                  <Button
                    variant="outlined"
                    color="primary"
                    className={classes.button}
                  >
                    All Products
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
                <IconButton
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="Menu"
                  component={Link}
                  to="/cart"
                >
                  <ShoppingCartIcon />
                </IconButton>
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
                <Link to="/allproducts">
                  <Button
                    variant="outlined"
                    color="primary"
                    className={classes.button}
                  >
                    All Products
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
                <Link to="/aboutus">
                  <Button
                    variant="outlined"
                    color="primary"
                    className={classes.button}
                  >
                    About Us
                  </Button>
                </Link>
                <IconButton
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="Menu"
                  component={Link}
                  to="/cart"
                >
                  <ShoppingCartIcon />
                </IconButton>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
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
