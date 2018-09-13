import React from 'react';

class SingleProduct extends React.Component {
	constructor(props) {
		super(props);
		this.state = { quantity: 0 };

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({ quantity: event.target.value });
	}

	handleSubmit(event) {
		console.log('The product quantity of ' + this.state.quanity + ' has been submited to cart');
		event.preventDefault();
		this.props.AddToCart(this.state.quantity);
	}

	render() {
		return (
			<div className="Product">
				<div className="Image">
					<img src="this.props.imgUrl" alt="Picture of the product" /> <br />
					<span className="productName">Item: {this.props.name}</span>
					<span className="productDescription">Description: {this.props.description}</span>
					<span className="productStock">In stock {this.props.stock} units.</span>
					<span className="productName">Price: {this.props.price / 100}</span>
				</div>
				<form className="form" onSubmit={this.handleSubmit}>
					<label>
						Quanitty
						<input type="number" value={this.state.quantity} onChange={this.handleChange} />
					</label>
					<input type="submit" value="Add to Cart" />
				</form>
			</div>
		);
	}
}

export default SingleProduct;
