import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchOrders} from '../store/order'
import {CartItems} from '../components'

/**
 * COMPONENT
 */
class CartView extends React.Component {

  componentDidMount() {
    // this.props.fetchOrders(this.props.user.id);
    this.props.fetchOrders(1);
  }

  render() {

    const {orders, loading, error} = this.props
    const cart = orders.filter(order => !order.isPurchased)[0]

    //check for loading and error states
    if (loading) {
      return <div>loading...</div>
    }
    if (error) {
      return <div>error!</div>
    }
    // console.log(`---------- cart ${JSON.stringify(cart)}`)
    return (
      <div>
        <h3>Cart</h3>
        <CartItems cart={cart}/>
      </div>
    )
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
})

export default connect(mapState, mapDispatch)(CartView)

/**
 * PROP TYPES
 */
// CartView.propTypes = {
//   loading: PropTypes.boolean,
//   error: PropTypes.boolean
// }
