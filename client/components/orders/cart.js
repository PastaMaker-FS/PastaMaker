import React from 'react'
import {connect} from 'react-redux'
import {fetchOrders, me} from '../../store'
import {CartView} from '../../components'

class Cart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      totalPending: -1,
      ready: false
    }

    this.incrementPending = this.incrementPending.bind(this);
    this.decrementPending = this.decrementPending.bind(this);
  }

  async componentDidMount() {
    await this.props.fetchUser();
    await this.props.fetchOrders(this.props.user);
    const cart = this.props.orders.filter(order => order.isPurchased === false)[0]
    this.setState({
      // cart: orders.filter(order => order.isPurchased === false)[0],
      totalPending: cart.products.reduce((a,b) => a + (b.price * b.quantity), 0),
      ready: true
    })
  }

  incrementPending(amount) {
    this.setState((prevState) => ({
      ...prevState,
      totalPending: prevState.totalPending + amount
    }))
  }

  decrementPending(amount) {
    this.setState((prevState) => ({
      ...prevState,
      totalPending: prevState.totalPending - amount
    }))
  }

  render() {

    const {orders, loading, error} = this.props;
    const {totalPending} = this.state;
    // const cart = orders.filter(order => order.isPurchased === false)[0]
    // console.log(`---cart: ${JSON.stringify(cart)}`)
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
    // const totalPrice = cart.products.reduce((a,b)=>a+b.price,0)
    return <CartView
      cart={orders.filter(order => order.isPurchased === false)[0]}
      totalPending={totalPending}
      incrementPending={this.incrementPending}
      decrementPending={this.decrementPending}
    />
    //totalPrice={totalPrice}
  }
}

const mapState = state => ({
  orders: state.orders.list,
  user: state.user.id,
  loading: state.orders.loading,
  error: state.orders.error
})

const mapDispatch = dispatch => ({
  fetchUser: () => dispatch(me()),
  fetchOrders: (userId) => dispatch(fetchOrders(userId)),
})

export default connect(mapState, mapDispatch)(Cart)
