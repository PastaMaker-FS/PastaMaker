import React from 'react';


///convert this later to a class and manage the form state?
export function STRIPE() {
	return (
		<form action="your-server-side-code" method="POST">
			<script
				src="https://checkout.stripe.com/checkout.js"
				class="stripe-button"
				data-key="pk_test_knVJ0WHfO6azkaY25gm6BppJ"
				data-amount="999"
				data-name="Demo Site"
				data-description="Example charge"
				data-image="https://stripe.com/img/documentation/checkout/marketplace.png"
				data-locale="auto"
			/>
		</form>
	);
}
