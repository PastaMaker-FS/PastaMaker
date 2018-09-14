import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ProductThumb from './productThumb';
import SingleProduct from './singleProduct';

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
					<SingleProduct product={this.props.productState.product} />
				</div>
			);
		}
	};
	render() {
		const enumeratedProducts = this.props.productState.products.map((product) => (
			<ProductThumb
				className="box2"
				key={product.id}
				product={product}
				selectProduct={this.selectProduct}
				addToCart={this.props.addToCart}
				deselectProduct={this.hideProduct} //Maybe we do want to deselect product from store?
			/>
		));

		return (
			<div>
				<div>{this.modalSingleProduct()}</div>
				<div className="productGrid">{this.state.showProduct ? <h3>Product</h3> : enumeratedProducts}</div>
			</div>
		);
	}
}
export default ProductGrid;
