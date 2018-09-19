const router = require('express').Router();
const { order } = require('../db/models');
const stripe = require('stripe')('sk_test_wFQxEwR1zd4tlLgLDdSX0nDD');
const uuidv1 = require('uuid/v1');
module.exports = router;

const paymentObject = {}

const postStripeCharge = res => (stripeErr, stripeRes) => {
  if (stripeErr) {
    res.status(500).send({ error: stripeErr });
  } else {
    res.status(200).send({ success: stripeRes });
  }
}

router.post('/', async (req, res, next) => {
	try {
    // //console.log('The stripe', req.body);
    // paymentObject.amount = req.body.amount;
    // paymentObject.currency = req.body.currency;
    // paymentObject.token = req.body.source;
    // paymentObject.description = req.body.description;

    // const response = await getStripe(paymentObject, res);
    // console.log(response);


      stripe.charges.create(req.body, postStripeCharge(res));


    //res.status(200).send({ success: stripeRes });
	} catch (error) {
		console.log('error', error);
	}
});


// function getStripe({amount, currency, token, description}) {
// 	return new Promise((resolve, reject) => {
//     let specialkey = uuidv1();
// 		stripe.charges.create(
// 			{
// 				amount,
// 				currency,
// 				source: token,
// 				description
// 			},
// 			{
// 				idempotency_key: specialkey
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
// async function getCharge(charge){

//   try {
//     stripe.charges.retrieve("ch_1DBSeLLV2XllS4MDb3aUjjSh", {
//       api_key: "sk_test_wFQxEwR1zd4tlLgLDdSX0nDD"
//     });
//   } catch (error) {

//   }
// }
