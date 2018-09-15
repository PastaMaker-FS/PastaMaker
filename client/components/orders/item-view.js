import React from 'react'

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

const styles = () => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

class ItemView extends React.Component {

  render() {
    const {
      classes,
      product,
      handleIncrement,
      handleDecrement,
      handleRemove
    } = this.props;


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
            onClick={handleIncrement}
          ><AddIcon />
          </IconButton>

          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            onClick={handleDecrement}
          ><RemoveIcon />
          </IconButton>

          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            onClick={handleRemove}
          ><ClearIcon />
          </IconButton>
        </TableCell>

      </TableRow>
    );
  }
}

export default withStyles(styles)(ItemView)
