import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getProductTHUNK, selectProduct} from '../../store/product'
//import ProductGrid from '../products/productGrid'

class AllProducts extends Component {
  componentDidMount() {
    this.props.fetchAllProducts()
  }

  render() {
    const allProducts = this.props.products
    const selectedProduct = this.props.selectedProduct
    return <div></div>
  }
}

const mapStoreToProps = store => {
  return {
    products: store.product
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAllProducts: () => dispatch(getProductTHUNK()),
    selectProduct: product => dispatch(selectProduct(product))
  }
}

export default connect(mapStoreToProps, mapDispatchToProps)(AllProducts)
