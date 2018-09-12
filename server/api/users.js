const router = require('express').Router()
const {User, Order} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const users = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    })
    res.json(users)
  } catch (error) {
    next(error)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const users = await User.findById(req.params.userId)
    res.json(users)
  } catch (error) {
    next(error)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.put('/:userId', async (req, res, next) => {
  try {
    const users = await User.findById(req.params.userId)
    await users.update({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    })
    res.json(users)
  } catch (error) {
    next(error)
  }
})

// get items for user (in cart)
router.get('/:userId/orders', async (req, res, next) => {
  try {
    const ordersWithProducts = [];
    const orders = await Order.findAll({ where: {
      userId: req.params.userId
    }})
    await Promise.all(
      orders.map(async (order) => {
        const products = await order.getProducts();
        ordersWithProducts.push({
          id: order.id,
          datePurchased: order.datePurchased,
          isPurchased: order.isPurchased,
          products})
      })
    )
    res.send(ordersWithProducts)
  } catch (error) {
    console.error(error);
    next(error)
  }
})

// add item to cart
// router.post('/:userId/orders', async (req, res, next) => {
//   try {

//   } catch (error) {

//   }
// })
