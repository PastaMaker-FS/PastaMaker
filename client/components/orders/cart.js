import React from 'react'
import {connect} from 'react-redux'
import {fetchOrders} from '../../store'
import {CartView} from '../../components'

class Cart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ready: false
    }
  }

  async componentDidMount() {
    await this.props.fetchOrders(this.props.user);
    this.setState({
      ready: true
    })
  }

  render() {

    const {orders, loading, error} = this.props
    const cart = orders.filter(order => order.isPurchased === false)[0]
    console.log(`------------ cart: ${JSON.stringify(cart)}`)
    const {ready} = this.state

    //check for loading and error states
    if (loading) {
      return <div>loading...</div>
    }
    if (error) {
      return <div>error!</div>
    }
    if (!(ready)) {
      return null;
    }

    // render cart
    return <CartView cart={cart} />
  }
}

const mapState = state => ({
  orders: state.orders.list,
  user: state.user.id,
  loading: state.orders.loading,
  error: state.orders.error
})

const mapDispatch = dispatch => ({
  fetchOrders: (userId) => dispatch(fetchOrders(userId)),
})

export default connect(mapState, mapDispatch)(Cart)
