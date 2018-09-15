import React from 'react'
import {connect} from 'react-redux'

// material ui
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

// thunks
import {
  decrementItem,
  incrementItem,
  destroyItem
} from '../../store';

// components
import {
  Item
} from '../../components'

// styles
const styles = theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

class CartView extends React.Component {

  render() {
    const {classes, cart} = this.props

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

const mapDispatch = dispatch => ({
  incrementItem: (orderId, productId) => dispatch(incrementItem(orderId, productId)),
  decrementItem: (orderId, productId) => dispatch(decrementItem(orderId, productId)),
  destroyItem: (orderId, productId) => dispatch(destroyItem(orderId, productId))
})

export default withStyles(styles)(connect(
  null,
  mapDispatch,
)(CartView));

