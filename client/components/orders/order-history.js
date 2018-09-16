import React from 'react'
import {connect} from 'react-redux'
import {fetchOrders, me} from '../../store'
import {OrderView} from '../../components'

const PurchasedOrders = ({orders}) => (
    <React.Fragment>
      {orders.map(order =>
        <OrderView key={order.id} order={order} /> )}
    </React.Fragment>
)

class OrderHistory extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ready: false
    }
  }

  async componentDidMount() {
    await this.props.fetchUser();
    await this.props.fetchOrders(this.props.user);
    this.setState({
      ready: true
    })
  }

  render() {

    const {orders, loading, error} = this.props
    const purchasedOrders = orders.filter(order => order.isPurchased)
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

    // render order history
    return <PurchasedOrders orders={purchasedOrders} />
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

export default connect(mapState, mapDispatch)(OrderHistory)
