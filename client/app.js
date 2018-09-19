import React from 'react'
import {connect} from 'react-redux'
import {Navbar} from './components'
import Routes from './routes'
import {fetchOrders, me} from './store'


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      ready: false
    }
    this.incrementCount = this.incrementCount.bind(this);
    this.decrementCount = this.decrementCount.bind(this);
  }

  async componentDidMount() {
    await this.props.fetchUser();
    await this.props.fetchOrders(this.props.user);
    const cart = this.props.orders.filter(order => order.isPurchased === false)[0]
    this.setState({
      count: cart.products.length,
      ready: true
    })
  }

  incrementCount(amount) {
    this.setState((prevState) => ({
      ...prevState,
      count: prevState.count + amount
    }))
  }

  decrementCount(amount) {
    this.setState((prevState) => ({
      ...prevState,
      count: prevState.count - amount
    }))
  }

  render() {
    const {loading, error} = this.props;
    const {count} = this.state;
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

    return (
      <div className="appDiv">
        <Navbar
          count={count}
        />
        <Routes
          incrementCount={this.incrementCount}
          decrementConnt={this.decrementCount}
        />
      </div>
    )
  }
}

const mapState = state => ({
  orders: state.orders.list,
  user: state.user,
  loading: state.orders.loading,
  error: state.orders.error
})

const mapDispatch = dispatch => ({
  fetchUser: () => dispatch(me()),
  fetchOrders: (user) => dispatch(fetchOrders(user)),
})

export default connect(mapState, mapDispatch)(App)
