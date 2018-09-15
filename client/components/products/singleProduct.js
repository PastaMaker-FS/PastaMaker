import React from 'react';

class SingleProduct extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			quantity: 0
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		console.log(event.target.value);
		this.setState({ quantity: event.target.value });
	}

	handleSubmit(event) {
		event.preventDefault();
		// Check to ensure quantity is not negative
		if (this.state.quantity <= 0) {
			this.setState(() => {
				return { quantity: 0 };
			});
			alert('Please enter a Quantity greater than Zero');
			console.log('An invalid quantity was submitted. No change to state.');
		} else {
			console.log('The product quantity of ' + this.state.quanity + ' has been submited to cart');

			this.props.addToCart(this.props.user.id, this.props.product.id, this.state.quantity);
		}
	}

	render() {
		const { name, description, stock, price, imgUrl } = this.props.product;

		console.log('IN Single PRoduct', this.props);
		return (
			<div className="Product">
				<div>
					<img src={imgUrl} alt="Picture of the product" onClick={() => this.props.selectProduct} /> <br />
					<span className="productName"> Item: {name}</span>
					<span className="productDescription"> Description: {description}</span>
					<span className="productStock"> In stock {stock} units.</span>
					<span className="productName"> Price: {price / 100}</span>
				</div>
				<form className="form" onSubmit={(event) => this.handleSubmit(event)}>
					<label>
						Quanity
						<input
							type="number"
							value={this.state.quantity}
							onChange={(event) => this.handleChange(event)}
						/>
					</label>
					<input type="submit" value="Add to Cart" />
				</form>
			</div>
		);
	}
}

export default SingleProduct;
