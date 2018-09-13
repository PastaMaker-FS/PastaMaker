import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

// The All Products component only maps through individual "Product" components.

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  }
})

function renderProducts (productArray) {
  return 1
}

const AllProducts = ({ handleClick, isLoggedIn, classes, products }) => {
  console.log("The products", products)
  return <div>"Hello from All Products!"</div>
}

/**
 * CONTAINER
 */
const mapState = state => {
  //isLoggedIn might be usefull to see the special prices on items
  return {
    products: state.products,
    isLoggedIn: !!state.user.id,
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick () {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(withStyles(styles)(AllProducts))

/**
 * PROP TYPES
 */
AllProducts.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired
}
