import React, {Component} from 'react'
import ProductThumb from './productThumb'
import {withStyles} from '@material-ui/core/styles'
import PropTypes from 'prop-types'

const styles = theme => ({
  productsStyle: {
    display: 'flex',
    justifyContent: "space-around",
    flexWrap: "wrap"
  }
})

class ProductGrid extends Component {
  constructor() {
    super()
    this.state = {showProduct: false}

    this.showProduct = this.showProduct.bind(this)
    this.hideProduct = this.hideProduct.bind(this)
  }

  showProduct() {
    this.setState({showProduct: true})
  }

  hideProduct() {
    this.setState({showProduct: false})
  }

  selectProduct = product => {
    this.showProduct()
    console.log('Product grid props are', this.props)
    this.props.selectProduct(product)
    console.log('The show product', this.state)
  }

  render() {
    const { classes } = this.props;
    const enumeratedProducts = this.props.productState.products.map(product => (
      <ProductThumb
        key={product.id}
        product={product}
        selectProduct={this.selectProduct}
        addToCart={this.props.addToCart}
        deselectProduct={this.hideProduct}
      />
    ))

    return <div className={classes.productsStyle}>{enumeratedProducts}</div>
  }
}

export default withStyles(styles)(ProductGrid)

/**
 * PROP TYPES
 */
ProductGrid.propTypes = {
  classes: PropTypes.object.isRequired
}
