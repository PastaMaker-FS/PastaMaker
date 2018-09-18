import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';

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
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

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
  flex: {
    flexGrow: 1,
  },
  table: {
    minWidth: 700,
  },
});

class CartView extends React.Component {

  render() {
    const {classes, cart, totalPending, user, incrementPending, decrementPending} = this.props

    return (
      <React.Fragment>

        <Toolbar>
          <Typography
            variant="title"
            color="inherit"
          >Your Cart
          </Typography>
        </Toolbar>

        <Paper className={classes.root}>

          <Toolbar>

            <Typography
              color="inherit"
              className={classes.flex}
            >Pending Order
            </Typography>

          </Toolbar>

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
                    this.props.incrementItem(user, cart.id, product.id)
                  }}
                  decrement={() => {
                    this.props.decrementItem(user, cart.id, product.id)
                  }}
                  remove={() => {
                    this.props.destroyItem(user, cart.id, product.id)
                  }}
                  incrementPending={incrementPending}
                  decrementPending={decrementPending}
                />
              )}
            </TableBody>

          </Table>

          <Toolbar>

          <Typography
              color="secondary"
              className={classes.flex}
            >Total Price: ${totalPending}
            </Typography>

            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              component={Link}
              to="/checkout"
            >Checkout
            </Button>

            <Button
              variant="contained"
              color="inherit"
              className={classes.button}
              component={Link}
              to="/allproducts"
            >Continue Shopping
            </Button>

          </Toolbar>

      </Paper>

      </React.Fragment>
    )
  }
}

const mapState = state => ({
  user: state.user
})

const mapDispatch = dispatch => ({
  incrementItem: (userId, orderId, productId) => dispatch(incrementItem(userId, orderId, productId)),
  decrementItem: (userId, orderId, productId) => dispatch(decrementItem(userId, orderId, productId)),
  destroyItem: (userId, orderId, productId) => dispatch(destroyItem(userId, orderId, productId))
})

export default withStyles(styles)(connect(
  mapState,
  mapDispatch,
)(CartView));

