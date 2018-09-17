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
import Toolbar from '@material-ui/core/Toolbar';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import Typography from '@material-ui/core/Typography';

// components
import {
  ItemView
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

class OrderView extends React.Component {

  render() {
    const {classes, order, user} = this.props

    return (
      <React.Fragment>

        <Paper className={classes.root}>

          <Toolbar>

          <Typography
            color="inherit"
            className={classes.flex}
          >Order #: {order.orderNumber} Order Placed: {order.datePurchased}
          </Typography>

          <Typography
            color="inherit"
          >Total Price: ${order.totalPrice}
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
              </TableRow>
            </TableHead>

            <TableBody>
              {order.products.map(product =>
                <ItemView
                  key={product.id}
                  product={product}
                />
              )}
            </TableBody>

          </Table>
        </Paper>

      </React.Fragment>
    )
  }
}


export default withStyles(styles)(OrderView);

