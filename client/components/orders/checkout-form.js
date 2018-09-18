import React from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import {fetchOrders, me, purchaseOrder} from '../../store'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  container: {
    // display: 'flex',
    // flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    // display: 'block',
    maxWidth: 600,
    minWidth: 350
  },
  flex: {
    flexGrow: 1,
  },
  full: {
    width: '100%'
  }
});

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      card: '',
      user: {},
      orderId: -1,
      totalPrice: -1,
      submitted: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  async componentDidMount() {
    await this.props.fetchUser();
    await this.props.fetchOrders(this.props.user);
    const cart = this.props.orders.filter(order => order.isPurchased === false)[0];
    this.setState({
      user: this.props.user,
      orderId: cart.id,
      totalPrice: cart.products.reduce((a,b) => a + (b.price * b.quantity), 0)
    })
    // const cart = orders.filter(order => order.isPurchased === false)[0];
    // const totalPrice = cart.products.reduce((a,b) => a + (b.price * b.quantity), 0);
  }

  handleInputChange({target: {name, value}}) {
    this.setState({
      [name]: value
    })
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    try {

      // await this.props.chargeCard({
      //   name: this.state.name,                  // required
      //   address: this.state.address,            // required
      //   description: this.state.description     //
      // })

      // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      // NEED TO SET PURCHASE PRICE ON ALL ORDER ITEMS HERE !!!!!!!
      // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

      await this.props.purchaseOrder(
        this.state.user,
        this.state.orderId,
        this.state.totalPrice
      )

      this.setState({
        submitted: true
      })
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    const {classes, loading, error} = this.props;
    const { name, email, card, submitted } = this.state;

    if (submitted) {
      return <div>confirmed</div>
      // return <Redirect to={`/confirmation`} />
    }

    // check for loading and error states
    if (loading) {
      return <div>loading...</div>
    }
    if (error) {
      return <div>error!</div>
    }



    return (

      <form onSubmit={this.handleSubmit}>
        {/* <div className={classes.container}></div> */}

      <Paper className={classes.root}>

        <Toolbar>
          <Typography
            variant="title"
            color="inherit"
            className={classes.flex}>
            Order #: 03245235-34534-345
          </Typography>
          <Button
            color="inherit"
          >
            Total Price: $123.45
          </Button>
        </Toolbar>

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="name">Name</InputLabel>
          <Input
            id="name"
            name='name'
            value={name}
            onChange={this.handleInputChange}
            error={!name}
          />
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input
            id="email"
            name='email'
            value={email}
            onChange={this.handleInputChange}
            error={!email}
          />
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="card">Card Number</InputLabel>
          <Input
            id="card"
            name='card'
            value={card}
            onChange={this.handleInputChange}
            error={!card}
          />
        </FormControl>

        <Button
          type='submit'
          variant="contained"
          color="primary"
          className={classes.button}
          disabled={!name || !email || !card} >
          Submit Order
        </Button>

        <Button
          variant="contained"
          color="secondary"
          className={classes.button} >
          Cancel Order
        </Button>

        </Paper>

      </form>

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
  // chargeCard: (card) => dispatch(chargeCard(card)),
  purchaseOrder: (user, orderId, price) => dispatch(purchaseOrder(user, orderId, price)),
})

export default withStyles(styles)(connect(
  mapState,
  mapDispatch
)(CheckoutForm));
