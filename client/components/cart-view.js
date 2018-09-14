import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchOrders} from '../store/order'
import {CartItems} from '../components'

/**
 * COMPONENT
 */
class CartView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // cart: {},
      ready: false
    }
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleIncrement = this.handleIncrement.bind(this);
  }

  async componentDidMount() {
    // this.props.fetchOrders(this.props.user.id);
    await this.props.fetchOrders(1);
    this.setState({
      ready: true
    })
  }

  render() {

    const {orders, loading, error} = this.props
    const cart = orders.filter(order => !order.isPurchased)[0]
    const {ready} = this.state

    //check for loading and error states
    if (loading) {
      return <div>loading...</div>
    }
    if (error) {
      return <div>error!</div>
    }
    // console.log(`---------- cart ${JSON.stringify(cart)}`)
    return (ready) ? (
      <div>
        <h3>Cart</h3>
        <CartItems
          cart={cart}
          // incrementItem={incrementItem}
          // decrementItem={decrementItem}
          // update={this.props.fetchOrders}
        />
      </div>
    ): null;
  }
}

/**
 * CONTAINER
 */

const mapState = state => ({
  orders: state.orders.list,
  user: state.user.id,
  loading: state.orders.loading,
  error: state.orders.error
})

const mapDispatch = dispatch => ({
  fetchOrders: (userId) => dispatch(fetchOrders(userId)),
  // incrementItem: (orderId, productId) => dispatch(incrementItem(orderId, productId))
})

export default connect(mapState, mapDispatch)(CartView)

/**
 * PROP TYPES
 */
// CartView.propTypes = {
//   loading: PropTypes.boolean,
//   error: PropTypes.boolean
// }
