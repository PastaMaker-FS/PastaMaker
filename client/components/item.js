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
// import { incrementItem } from '../store/order';

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
class Item extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      product: {},
      ready: false
    }

    this.handleIncrement = this.handleIncrement.bind(this)
  }

  componentDidMount() {
    this.setState({
      product: this.props.product,
      ready: true
    })
  }

  async handleIncrement(evt) {
    evt.preventDefault();
    await this.props.increment();
    this.setState(prevState => ({
      ...prevState,
      product: {
        ...prevState.product,
        quantity: prevState.product.quantity + 1
      }
    }))
  }

  // const cart = orders.filter(order => !order.isPurchased)[0]

  render() {
    const {classes} = this.props;
    const {product, ready} = this.state;

    // console.log(`---------- cart ${JSON.stringify(product)}`)

    // if (!(ready)) return null;

    return (
      <TableRow
        hover
        key={product.id}
        // component={Link}
        // to={`/product/${product.id}`}
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
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            onClick={this.handleIncrement}
          ><AddIcon />
          </IconButton>

          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"

          ><RemoveIcon />
          </IconButton>

          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"

          ><ClearIcon />
          </IconButton>
        </TableCell>

      </TableRow>
    );
  }
}

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   email: PropTypes.string
// }


// const mapState = state => ({

// })

// const mapDispatch = dispatch => {
//   return {
//     incrementItem: (orderId, productId) => dispatch(incrementItem(orderId, productId))
//   }
// }

export default withStyles(styles)(connect(
  null,
  null,
)(Item));
