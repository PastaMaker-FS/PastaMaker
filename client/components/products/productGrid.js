import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ProductThumb from './productThumb';

class ProductGrid extends Component {
	constructor() {
		super();
		this.state = { showProduct: false };

		this.showProduct = this.showProduct.bind(this);
		this.hideProduct = this.hideProduct.bind(this);
	}

	showProduct() {
		this.setState({ showProduct: true });
	}

	hideProduct() {
		this.setState({ showProduct: false });
	}

 selectProduct = (product) => {
    this.showProduct();
    console.log('Product grid props are', this.props);
    this.props.selectProduct(product);
    console.log('The show product', this.state);
  }

	render() {

		const enumeratedProducts = this.props.productState.products.map((product) => (
			<ProductThumb
				key={product.id}
				product={product}
				selectProduct={this.selectProduct}
        addToCart={this.props.addToCart}
        deselectProduct={this.hideProduct}
			/>
		));

		return <div className="productGrid">{enumeratedProducts}</div>;
	}
}
export default ProductGrid;
