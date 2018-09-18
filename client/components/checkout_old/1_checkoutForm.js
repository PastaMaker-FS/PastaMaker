import React from 'react';

import {StripeProvider} from 'react-stripe-elements';

import MyStoreCheckout from './2_myStoreCheckout';

const CheckoutForm = () => {
  const apiPub = "pk_test_knVJ0WHfO6azkaY25gm6BppJ"
  return (
    <StripeProvider apiKey={apiPub}>
      <MyStoreCheckout />
    </StripeProvider>
  );
};

export default CheckoutForm;
