import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchOrders} from '../store/order'

/**
 * COMPONENT
 */
class CartView extends React.Component {

  componentDidMount() {
    // this.props.fetchOrders(this.props.user.id);
    this.props.fetchOrders(2);
  }

  render() {

    const {orders, loading, error} = this.props

    //check for loading and error states
    if (loading) {
      return <div>loading...</div>
    }
    if (error) {
      return <div>error!</div>
    }
    console.log(orders)
    return (
      <div>
        <h3>Cart</h3>
        {orders.map(order => (
          <li>{order.id}</li>
        ))}
        {/* <CartItems orders={orders}/> */}
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
