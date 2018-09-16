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

// import { createCampus } from '../../reducers';
import { Cart } from '../../components'

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
      submitted: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange({target: {name, value}}) {
    this.setState({
      [name]: value
    })
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.createCampus({
      name: this.state.name,                  // required
      address: this.state.address,            // required
      description: this.state.description     //
    })
    this.setState({
      submitted: true
    })
  }

  render() {
    const { classes } = this.props;
    const { name, email, card, submitted } = this.state;

    if (submitted) {
      return <Redirect to={`/confirmation`} />
    }

    return (
      <React.Fragment>
      <form onSubmit={this.handleSubmit}>
        <div className={classes.container}></div>

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
          className={classes.button}
        >
          Cancel Order
        </Button>

        </Paper>

      </form>
      </React.Fragment>
    )
  }
}

const mapDispatch = dispatch => ({
    createCampus: (campus) => dispatch(createCampus(campus))
})

export default withStyles(styles)(connect(
  null,
  mapDispatch
)(CheckoutForm));
