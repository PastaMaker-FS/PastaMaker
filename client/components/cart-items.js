import React from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import {Item} from '../components'

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import EditIcon from '@material-ui/icons/Edit';
import ClearIcon from '@material-ui/icons/Clear';
import { decrementItem, incrementItem, destroyItem } from '../store/order';

const styles = theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

// const CartItems = props => {
class CartItems extends React.Component {

  render() {
    const {classes, cart} = this.props

    console.log(`---------- cart ${JSON.stringify(cart)}`)
    return (
      <React.Fragment>

        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Avatar</TableCell>
                <TableCell>Name</TableCell>
                <TableCell numeric>Quantity</TableCell>
                <TableCell numeric>Price</TableCell>
                <TableCell numeric>Subtotal</TableCell>
                <TableCell>Add / Subtract / Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.products.map(product =>
                <Item
                  key={product.id}
                  product={product}
                  increment={() => {
                    this.props.incrementItem(cart.id, product.id)
                  }}
                  decrement={() => {
                    this.props.decrementItem(cart.id, product.id)
                  }}
                  remove={() => {
                    console.log(`--- remove: ${cart.id}, ${product.id}`)
                    // console.log(`--- calls destroyItem: ${destroyItem}`)
                    this.props.destroyItem(cart.id, product.id)
                  }}
                />
              )}
            </TableBody>
          </Table>
        </Paper>

        <Button
          // className={classes.button}
          color="inherit"
          aria-label="Menu"
        >Submit
        </Button>

      </React.Fragment>
    )
  }
}

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   email: PropTypes.string
// }


const mapDispatch = dispatch => ({
  incrementItem: (orderId, productId) => dispatch(incrementItem(orderId, productId)),
  decrementItem: (orderId, productId) => dispatch(decrementItem(orderId, productId)),
  destroyItem: (orderId, productId) => dispatch(destroyItem(orderId, productId))
})


export default withStyles(styles)(connect(
  null,
  mapDispatch,
)(CartItems));

