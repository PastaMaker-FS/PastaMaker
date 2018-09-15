import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ProductThumb from './productThumb';
import SingleProduct from './singleProduct';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import createItem from '../../store/order';

const styles = theme => ({
  productsStyle: {
    display: 'flex',
    flexWrap: 'wrap'
  }
})

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
      )
    }
  }
  render() {
    const {classes} = this.props
    const enumeratedProducts = this.props.productState.products.map(product => (
      <ProductThumb
        className="box2"
        key={product.id}
        product={product}
        selectProduct={this.selectProduct}
        deselectProduct={this.hideProduct}

        user={this.props.user}
        addToCart={this.props.addToCart}
      />
    ))

		console.log('The add to cart function is: ', createItem);
		return (
			<div>
				<div>{this.modalSingleProduct()}</div>
				<div className={classes.productsStyle}>
					{this.state.showProduct ? <h3>Product</h3> : enumeratedProducts}
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(ProductGrid);

ProductGrid.propTypes = {
	classes: PropTypes.object.isRequired
};
