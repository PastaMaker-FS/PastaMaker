import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getProductTHUNK, selectProduct} from '../../store/product'
import {createItem, fetchOrders} from '../../store'
import ProductGrid from '../products/productGrid'
//import history from '../history'
import STRIPE from '../payments/stripe'

class AllProducts extends Component {
  async componentDidMount() {
    await this.props.fetchAllProducts()
    this.props.fetchOrders(this.props.user)
  }

  render() {
    return (
      <div >
        <ProductGrid
          productState={this.props.products}
          selectProduct={this.props.selectProduct}
          user={this.props.user}
          addToCart={this.props.addToCart}
          incrementCount={this.props.incrementCount}
          decrementConnt={this.props.decrementCount}
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
    fetchOrders: user => dispatch(fetchOrders(user)),
    selectProduct: product => dispatch(selectProduct(product)),
    addToCart: (user, productId, quantity) =>
      dispatch(createItem(user, productId, quantity))
  }
}

export default connect(mapStoreToProps, mapDispatchToProps)(AllProducts)
