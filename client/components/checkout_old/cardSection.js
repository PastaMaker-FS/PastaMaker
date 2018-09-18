import React from 'react';
import { CardElement, CardNumberElement, CardExpiryElement, CardCVCElement } from 'react-stripe-elements';

class CardSection extends React.Component {
	render() {
		return (<div>
			<label>
				Card details
				<CardElement style={{ base: { fontSize: '18px' } }} />
				More card details
        </label>
				{/* <label>
					Card number
					<CardNumberElement style={{ base: { fontSize: '18px' } }}
					/>
				</label>
				<label>
					Expiration date
					<CardExpiryElement style={{ base: { fontSize: '18px' } }}/>
				</label>
				<label>
					CVC
					<CardCVCElement style={{ base: { fontSize: '18px' } }}/>
				</label> */}
        </div>

		);
	}
}

export default CardSection;
