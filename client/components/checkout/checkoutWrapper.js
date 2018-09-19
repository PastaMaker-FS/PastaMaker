import React from 'react';
import Checkout from './checkout';

class CheckoutWrapper extends React.Component{

  render() {
    return (<div> <Checkout
      name={'PastaBoss'}
      description={'AllThePasta'}
      amount={1}
    /></div>)
  }
}

export default CheckoutWrapper;
