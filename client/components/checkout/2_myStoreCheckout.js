import React from 'react';
import {Elements} from 'react-stripe-elements';

import Checkout from './3_checkout';

class MyStoreCheckout extends React.Component {
  render() {
    return (
      <Elements>
        <Checkout />
      </Elements>
    );
  }
}

export default MyStoreCheckout;
