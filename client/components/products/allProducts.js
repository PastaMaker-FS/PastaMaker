import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getProductTHUNK, selectProduct} from '../../store/product'
import ProductGrid from '../products/productGrid'

class AllProducts extends Component {
	componentDidMount() {
		this.props.fetchAllProducts();
	}

	render() {

		return (
			<div className="allProducts">
				<ProductGrid productState={this.props.products} selectProduct={this.props.selectProduct} />
			</div>
		);
	}
}

const mapStoreToProps = (store) => {
	return {
		products: store.product
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchAllProducts: () => dispatch(getProductTHUNK()),
		selectProduct: (product) => dispatch(selectProduct(product))
	//addToCart: product => dispatch()
	};
};

export default connect(mapStoreToProps, mapDispatchToProps)(AllProducts);
