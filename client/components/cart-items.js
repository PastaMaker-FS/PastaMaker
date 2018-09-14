import React from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

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

  // const cart = orders.filter(order => !order.isPurchased)[0]

  render() {
    const {classes, cart} = this.props

    console.log(`---------- cart ${JSON.stringify(cart)}`)
    return (cart) ? (
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
              {cart.products.map(product => {
                return (
                  <TableRow
                    hover
                    key={product.id}
                    // component={Link}
                    // to={`/students/${student.id}`}
                  >
                    <TableCell>
                      <Avatar
                        // alt="Adelle Charles"
                        src={product.imgUrl}
                        className={classNames(classes.avatar, classes.bigAvatar)}
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                    {product.name}
                    </TableCell>

                    <TableCell numeric>
                      {product.quantity}

                    </TableCell>

                    <TableCell numeric>{product.price}</TableCell>

                    <TableCell numeric>{product.quantity * product.price}</TableCell>

                    <TableCell>
                    <IconButton
                        raised
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="Menu"
                        // component={Link}
                        // to={`/students/${student.id}/edit`}
                      ><AddIcon />
                      </IconButton>

                      <IconButton
                        raised
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="Menu"
                        // component={Link}
                        // to={`/students/${student.id}/edit`}
                      ><RemoveIcon />
                      </IconButton>

                      <IconButton
                        raised
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="Menu"
                        // onClick={(evt) => {
                        //   evt.preventDefault();
                        //   deleteStudent(student.id)
                        // }}
                      ><ClearIcon />
                      </IconButton>
                    </TableCell>


                  </TableRow>
                );
              })}

            </TableBody>
          </Table>
        </Paper>

        <Button
          raised
          // className={classes.button}
          color="inherit"
          aria-label="Menu"
        >Submit
        </Button>

      </React.Fragment>
    ) : null
  }
}

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   email: PropTypes.string
// }

// export default CartItems
export default withStyles(styles)(CartItems);
