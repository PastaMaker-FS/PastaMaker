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
	};

  modalSingleProduct = () => {
    const hidden = this.props.showProduct;
    if (hidden) {
      console.log("It's hidden!");
      return <h1>it's hidden</h1>
    } else {
      console.log("It's showing!");
      return <h1>it's showing</h1>
    }
  }
	render() {
		const enumeratedProducts = this.props.productState.products.map((product) => (
			<ProductThumb
				key={product.id}
				product={product}
				selectProduct={this.selectProduct}
				addToCart={this.props.addToCart}
				deselectProduct={this.hideProduct} //Maybe we do want to deselect product from store?
			/>
		));



		return (
			<div className="productGrid">
				<div>
					{this.modalSingleProduct()}
				</div>
				{enumeratedProducts}
			</div>
		);
	}
}
export default ProductGrid;
