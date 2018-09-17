import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProductTHUNK, selectProduct } from '../../store/product';
import { createItem, fetchOrders } from '../../store';
import ProductGrid from '../products/productGrid';
//import history from '../history'
import STRIPE from '../payments/stripe';

class AllProducts extends Component {
  async componentDidMount() {
    await this.props.fetchAllProducts()
    this.props.fetchOrders(this.props.user.id)
  }

  render() {
<<<<<<< HEAD
    console.log('this is users', this.props.user)
=======
>>>>>>> 3e52d43d70a78cdcf3dcf09e3e6a1b1d2d40c6b7
    return (
      <div>
        <h1> ALL PRODUCTS</h1>
        <ProductGrid
          productState={this.props.products}
          selectProduct={this.props.selectProduct}
          user={this.props.user}
          addToCart={this.props.addToCart}
        />
      </div>
    )
  }
}

const mapStoreToProps = store => {
  return {
    products: store.product,
    user: store.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAllProducts: () => dispatch(getProductTHUNK()),
    fetchOrders: userId => dispatch(fetchOrders(userId)),
    selectProduct: product => dispatch(selectProduct(product)),
    addToCart: (userId, productId, quantity) =>
      dispatch(createItem(userId, productId, quantity))
  }
}

export default connect(mapStoreToProps, mapDispatchToProps)(AllProducts)
