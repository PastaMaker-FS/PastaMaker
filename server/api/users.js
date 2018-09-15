const router = require('express').Router()
const {User, Order, Item} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const email = req.body.email
  const password = req.body.password
  try {
    const users = await User.create({
      firstName,
      lastName,
      email,
      password
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

// get all orders for user if auth user or admin
// for cart/history --> filter by isPurchased
router.get('/:userId/orders', async (req, res, next) => {

  const getOrders = async () => {
    const ordersWithProducts = []
    const orders = await Order.findAll({
      where: {
        userId: req.params.userId
      }
    })

    await Promise.all(
      orders.map(async order => {
        const products = await order.getProducts()

        const productsParsed = products.map(product => ({
          id: product.id,
          name: product.name,
          description: product.description,
          stock: product.stock,
          price: product.price,
          purchasePrice: product.item.purchasePrice,
          quantity: product.item.quantity,
          imgUrl: product.imgUrl
        }))

        ordersWithProducts.push({
          id: order.id,
          datePurchased: order.datePurchased,
          isPurchased: order.isPurchased,
          products: productsParsed
        })
      })
    )
    return ordersWithProducts
  }

  try {
    if ( req.params.userId == req.user.id ) { //|| req.user.isAdmin
      const orders = await getOrders()
      res.json(orders)
    } else {
      res.status(403).end()
    }
  } catch (error) {
    console.error(error)
    next(error)
  }
})

// add item to cart
router.post('/:userId/orders', async (req, res, next) => {

  try {
    // get user's cart if it exists
    let cart = await Order.findOne({
      where: {
        userId: req.params.userId,
        isPurchased: false
      }
    })

    // create cart if it doesn't exist
    if (!cart) {
      cart = await Order.create({
        // datePurchased: req.body.datePurchased,
        userId: req.params.userId
      })
    }

    // add item to cart
    const item = await Item.create({
      orderId: cart.id,
      productId: req.body.productId
    })

    res.json(item)
  } catch (error) {
    console.error(error)
    next(error)
  }
})

// delete item
router.delete('/:userId/orders/:orderId/:productId', async (req, res, next) => {
  try {
    if ( req.params.userId == req.user.id ) { //|| req.user.isAdmin
      const numAffectedRows = await Item.destroy({
        where: {
          orderId: req.params.orderId,
          productId: req.params.productId
        }
      })
      const status = numAffectedRows > 0 ? 204 : 404;
      res.status(status).end()
    } else {
      res.status(403).end()
    }
  } catch (err) {
    console.error(err)
    next(err)
  }

})
