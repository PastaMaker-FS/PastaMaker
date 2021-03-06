import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { me } from './store';
import AllProducts from './components/products/allProducts';
import AboutUs from './components/aboutus';
import { UserSign, UserUpdate } from './components/sign-form';
import Home from './components/home';
import { Login, UserHome, Cart, Confirmation } from './components';

import CheckoutWrapper from './components/checkout/checkoutWrapper';
/**
 * COMPONENT
 */
class Routes extends Component {
	componentDidMount() {
		this.props.loadInitialData();
	}

	render() {
		const { isLoggedIn } = this.props;

		return (
			<Switch>
				{/* Routes placed here are available to all visitors */}
				<Route exact path="/login" component={Login} />
				<Route exact path="/signup" component={UserSign} />
				<Route exact path="/" component={Home} />
				<Route exact path="/aboutus" component={AboutUs} />
				<Route exact path="/allproducts" component={AllProducts} />
				<Route exact path="/cart" component={Cart} />
				<Route exact path="/checkout" component={CheckoutWrapper} />
				<Route exact path="/confirmation" component={Confirmation} />
				{isLoggedIn && (
					<Switch>
						{/* Routes placed here are only available after logging in */}
						<Route exact path="/" component={AllProducts} />
						{/* <Route exact path="/aboutus" component={AboutUs} /> */}
						<Route exact path="/user" component={UserHome} />
					</Switch>
				)}
				{/* Displays our Login component as a fallback */}
				<Route component={Login} />
			</Switch>
		);
	}
}

/**
 * CONTAINER
 */
const mapState = (state) => {
	return {
		// Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
		// Otherwise, state.user will be an empty object, and state.user.id will be falsey
		isLoggedIn: !!state.user.id
	};
};

const mapDispatch = (dispatch) => {
	return {
		loadInitialData() {
			dispatch(me());
		}
	};
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));

/**
 * PROP TYPES
 */
Routes.propTypes = {
	loadInitialData: PropTypes.func.isRequired,
	isLoggedIn: PropTypes.bool.isRequired
};
