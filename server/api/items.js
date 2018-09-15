const router = require('express').Router()
const {Order, Item} = require('../db/models')
module.exports = router

router.get('/:orderId/:productId', async (req, res, next) => {
  try {
    // get item
    const item = await Item.findOne({ where: {
      orderId: req.params.orderId,
      productId: req.params.productId,
    }})

    res.json(item);

  } catch (error) {
    console.error(error);
    next(error)
  }
})

// edit item
router.put('/:orderId/:productId', async (req, res, next) => {

  try {
    // get item
    const item = await Item.findOne({ where: {
      orderId: req.params.orderId,
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


