import React, { Component } from 'react';

import ProductThumb from './productThumb';
import SingleProduct from './singleProduct';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import createItem from '../../store/order';
import Modal from '@material-ui/core/Modal';


function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = (theme) => ({
	productsStyle: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	paper: {
		position: 'absolute',
		width: theme.spacing.unit * 50,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing.unit * 4
	}
});

class ProductGrid extends Component {
	constructor() {
		super();
		this.state = { showProduct: false };

		this.showProduct = this.showProduct.bind(this);
		this.hideProduct = this.hideProduct.bind(this);
	}

	showProduct() {
		this.setState(() => {
			return { showProduct: true };
		});
	}

	hideProduct() {
		this.setState(() => {
			return { showProduct: false };
		});
	}

	selectProduct = (product) => {
		this.showProduct();
		this.props.selectProduct(product);
	};

	modalSingleProduct = () => {
		if (this.state.showProduct) {
			return (
				<div>
					<div onClick={() => this.hideProduct()}>return to all products</div>

					<SingleProduct
						product={this.props.productState.product}
						user={this.props.user}
						addToCart={this.props.addToCart}
					/>
				</div>
			);
		}
	};
	render() {
		const { classes } = this.props;
		const enumeratedProducts = this.props.productState.products.map((product) => (
			<ProductThumb
				className="box2"
				key={product.id}
				product={product}
				selectProduct={this.selectProduct}
				deselectProduct={this.hideProduct}
				user={this.props.user}
				addToCart={this.props.addToCart}
			/>
		));

		console.log('The add to cart function is: ', createItem);
		return (
			<div>
        <div className={classes.productsStyle}>
        {enumeratedProducts}
				</div>


					<Modal
						aria-labelledby="simple-modal-title"
						aria-describedby="simple-modal-description"
						open={this.state.showProduct}
						onClose={this.hideProduct}
					>
          <div style={getModalStyle()} className={classes.paper}>
          <SingleProduct
						product={this.props.productState.product}
						user={this.props.user}
            addToCart={this.props.addToCart}
            hide={this.hideProduct}
					/>
            </div>
					</Modal>


			</div>
		);
	}
}

export default withStyles(styles)(ProductGrid);

ProductGrid.propTypes = {
	classes: PropTypes.object.isRequired
};
