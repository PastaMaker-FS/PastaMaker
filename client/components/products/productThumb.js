`import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = (theme) => ({
	img: {
		height: 200,
		width: 125
	},
	divStyle: {
		textAlign: 'center'
	}
});

function ProductThumb({ product, addToCart, selectProduct, deselectProduct, classes }) {
	console.log('In PRoduct Thumb, addToCart is:', addToCart);
	return (
		<div className={classes.divStyle}>
			<img className={classes.img} src={product.imgUrl} onClick={() => selectProduct(product)} />
			<div>{product.name}</div>
			<div className="addToCart" onClick={() => addToCart(1, 2)}>
				{' '}
				Add to cart
			</div>
		</div>
	);
}

export default withStyles(styles)(ProductThumb);

ProductThumb.propTypes = {
	classes: PropTypes.object.isRequired
};
