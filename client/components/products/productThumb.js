import React from 'react';
import {withStyles} from '@material-ui/core/styles'
import PropTypes from 'prop-types'


const styles = theme => ({
  img: {
    height: 200,
    width: 125
  },
  divStyle:{
    textAlign: "center",
  }
})

function ProductThumb({ product, user, addToCart, selectProduct, deselectProduct, classes}) {
	return (
  <div className={classes.divStyle}>
    <img className={classes.img} src={product.imgUrl} onClick={() => selectProduct(product)}/>
    <div>{product.name}</div>
    <div className="addToCart" onClick={() => addToCart(user.id, product.id)}> Add to cart</div>
  </div>);
}

export default withStyles(styles)(ProductThumb);

ProductThumb.propTypes = {
  classes: PropTypes.object.isRequired
}

