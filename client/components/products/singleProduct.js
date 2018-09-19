import React from 'react'

export class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 0
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({quantity: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    // Check to ensure quantity is not negative
    if (this.state.quantity <= 0) {
      this.setState(() => {
        return {quantity: 0}
      })
      alert('Please enter a Quantity greater than Zero')
    } else {
      this.props.addToCart(
        this.props.user.id,
        this.props.product.id,
        this.state.quantity
      )
    }
  }

  render() {
    const {name, description, stock, price, imgUrl} = this.props.product
    const hideProduct = this.props.hide
    return (
      <div className="Product">
        <span onClick={() => hideProduct()}>Close X</span>
        <div>
          <img
            src={imgUrl}
            className="img"
            alt="Picture of the product"
            onClick={() => this.props.selectProduct}
          />
          <br />
          <div className="singleProductDiv">
            <h4> {name}</h4>
            <p>Description: {description}</p>
            <span className="productStock"> In stock {stock} units.</span>
            <span> Price: {price / 100}</span>
          </div>
        </div>
        <form className="form" onSubmit={event => this.handleSubmit(event)}>
          <label>
            Quanity
            <input
              type="number"
              value={this.state.quantity}
              onChange={event => this.handleChange(event)}
            />
          </label>
          <input type="submit" value="Add to Cart" />
        </form>
      </div>
    )
  }
}

export default SingleProduct
