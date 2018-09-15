import React from 'react'

// components
import {
  ItemView
} from '../../components'

class Item extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      product: {},
      ready: false
    }

    this.handleIncrement = this.handleIncrement.bind(this)
    this.handleDecrement = this.handleDecrement.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  componentDidMount() {
    this.setState({
      product: this.props.product,
      ready: true
    })
  }

  async handleIncrement(evt) {
    evt.preventDefault();
    await this.props.increment();
    this.setState(prevState => ({
      ...prevState,
      product: {
        ...prevState.product,
        quantity: prevState.product.quantity + 1
      }
    }))
  }

  async handleDecrement(evt) {
    evt.preventDefault();
    await this.props.increment();
    this.setState(prevState => ({
      ...prevState,
      product: {
        ...prevState.product,
        quantity: prevState.product.quantity - 1
      }
    }))
  }

  async handleRemove(evt) {
    evt.preventDefault();
    await this.props.remove();
  }

  render() {
    const {product, ready} = this.state;

    // check for data ready
    if (!(ready)) {
      return null;
    }

    return (
      <ItemView
        product={product}
        handleDecrement={this.handleDecrement}
        handleIncrement={this.handleIncrement}
        handleRemove={this.handleRemove}
      />
    );
  }
}

export default Item
