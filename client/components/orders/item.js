import React from 'react'
import {connect} from 'react-redux'

// material ui
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
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

class Item extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      product: {},
      ready: false
    }

    this.handleIncrement = this.handleIncrement.bind(this)
    this.handleDecrement = this.handleDecrement.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
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

  async handleDecrement(evt) {
    evt.preventDefault();
    await this.props.increment();
    this.setState(prevState => ({
      ...prevState,
      product: {
        ...prevState.product,
        quantity: prevState.product.quantity - 1
      }
    }))
  }

  async handleRemove(evt) {
    evt.preventDefault();
    await this.props.remove();
  }

  render() {
    const {classes} = this.props;
    const {product, ready} = this.state;

    // check for data ready
    if (!(ready)) {
      return null;
    }

    return (
      <TableRow
        hover
        key={product.id}
        // component={Link}
        // to={`/product/${product.id}`}
      >
        <TableCell>
          <Avatar
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

        <TableCell numeric>
          {product.price}
        </TableCell>

        <TableCell numeric>
          {product.quantity * product.price}
        </TableCell>

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
            onClick={this.handleDecrement}
          ><RemoveIcon />
          </IconButton>

          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            onClick={this.handleRemove}
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
