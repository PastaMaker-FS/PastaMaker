const router = require('express').Router()
const {order} = require('../db/models')
module.exports=router

router.post('/', async (req, res, next) => {
  try {
console.log("The stripe", req)
  } catch (error) {
console.log("error", error)
  }
})
// var stripe = require('stripe')('sk_test_wFQxEwR1zd4tlLgLDdSX0nDD');

// //What are we taking in?

// //We are taking in the credit card order form.

// //Generate Unique IDS


// function getStripe() {
// 	return new Promise((resolve, reject) => {
// 		stripe.charges.create(
// 			{
// 				amount: 2000,
// 				currency: 'usd',
// 				source: 'tok_amex', // obtained with Stripe.js
// 				description: 'Charge for jenny.rosen@example.com'
// 			},
// 			{
// 				idempotency_key: 'C2A2hazus6O3mhIl'
// 			},
// 			function(err, charge) {
// 				if (err) {
// 					reject(err);
// 				} else {
// 					resolve(charge);
// 				}
// 			}
// 		);
// 	});
// }

// async function testStripe() {
// 	let charge = await getStripe();

//   console.log('charge', charge.id);
// }

// testStripe()
// // async function getCharge(charge){

// //   try {
// //     stripe.charges.retrieve("ch_1DBSeLLV2XllS4MDb3aUjjSh", {
// //       api_key: "sk_test_wFQxEwR1zd4tlLgLDdSX0nDD"
// //     });
// //   } catch (error) {

// //   }
// // }
