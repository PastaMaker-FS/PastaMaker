const router = require('express').Router()
const {Order, Item} = require('../db/models')
module.exports = router

// edit item
router.put('/:orderId/:productId', async (req, res, next) => {

  try {
    // get item in cart
    const cart = await Order.findOne({ where: {
      userId: req.params.userId,
      isPurchased: false
    }})
    const item = await Item.findOne({ where: {
      orderId: cart.id,
      productId: req.params.productId,
    }})

    // update item
    const updatedItem = await item.update({
      quantity: req.body.quantity,
      purchasePrice: req.body.purchasePrice,
    })

    res.json(updatedItem);

  } catch (error) {
    console.error(error);
    next(error);
  }
})
