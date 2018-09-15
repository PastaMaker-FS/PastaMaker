import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getProductTHUNK, selectProduct} from '../../store/product'
import {createItem} from '../../store'
import ProductGrid from '../products/productGrid'

class AllProducts extends Component {
	componentDidMount() {
		this.props.fetchAllProducts();
	}

	render() {

		return (
			<div className="allProducts">
        <ProductGrid
          productState={this.props.products}
          selectProduct={this.props.selectProduct}

          user={this.props.user}
          addToCart={this.props.addToCart}
        />
			</div>
		);
	}
}

const mapStoreToProps = (store) => {
	return {
    products: store.product,
    user: store.user
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchAllProducts: () => dispatch(getProductTHUNK()),
		selectProduct: (product) => dispatch(selectProduct(product)),
	  addToCart: (userId, productId) => dispatch(createItem(userId, productId))
	};
};

export default connect(mapStoreToProps, mapDispatchToProps)(AllProducts);
