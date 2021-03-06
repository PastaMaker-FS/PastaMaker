const router = require('express').Router()
const {User, Order, Item, Address} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  const name = req.body.name
  const email = req.body.email
  const password = req.body.password
  const street = req.body.street
  const city = req.body.city
  const state = req.body.state
  const zip = req.body.zip
  try {
    const newUser = await User.create({
      name,
      email,
      password
    })
    const newAddress = await Address.create({
      userId: newUser.id,
      street,
      city,
      state,
      zip
    })
    const user = await User.findOne({
      where: {
        id: newUser.id
      },
      include: {
        model: Address
      }
    })
    req.login(user, err => (err ? next(err) : res.json(user)))
    res.json(user)
  } catch (error) {
    res.json({message: 'User Already Exists!'})
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

// update user information route may need to fix this up?
router.put('/', async (req, res, next) => {
  try {
    const users = await User.find({
      where: {
        email: req.body.email
      }
    })

    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const street = req.body.street
    const city = req.body.city
    const state = req.body.state
    const zip = req.body.zip

    if (!users) res.status(404)

    const updatedUser = await User.update(
      {
        name,
        email,
        password
      },
      {
        where: {
          email: req.body.email
        }
      }
    )

    const updatedAddress = await Address.update(
      {
        street,
        city,
        state,
        zip
      },
      {
        where: {
          userId: users.id
        }
      }
    )

    const user = await User.findOne({
      where: {
        id: updatedUser.id
      },
      include: {
        model: Address
      }
    })
    res.json(user)
  } catch (error) {
    next(error)
  }
})
//========================== ORDER ROUTES FOR USER =====================
// get all orders for user if auth user or admin
// for cart/history --> filter by isPurchased

router.get('/:userId/orders', async (req, res, next) => {

const getUserOrders = async () => {
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

  // then get all orders
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
        totalPrice: order.totalPrice,
        orderNumber: order.orderNumber,
        products: productsParsed
      })
    })
  )
  return ordersWithProducts
}



  try {
    if (req.user && req.params.userId == req.user.id) {
      //|| req.user.isAdmin
      const orders = await getUserOrders()
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
  console.log(`-------- req.body: ${JSON.stringify(req.body)}`)
  try {
    // get user's cart if it exists
    let cart = await Order.findOne({
      where: {
        userId: req.params.userId,
        isPurchased: false
      }
    })

    // create cart if it doesn't exist
    // if (!cart) {
    //   cart = await Order.create({
    //     // datePurchased: req.body.datePurchased,
    //     userId: req.params.userId
    //   })
    // }

    // add item to cart
    const newItem = await Item.create({
      orderId: cart.id,
      productId: req.body.productId,
      quantity: req.body.quantity
    })



    // res.json(item)
    res.json({
      id: newItem.productId,
      purchasePrice: newItem.purchasePrice,
      quantity: newItem.quantity,
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
})

// delete item
router.delete('/:userId/orders/:orderId/:productId', async (req, res, next) => {
  try {
    if (req.params.userId == req.user.id) {
      //|| req.user.isAdmin
      const numAffectedRows = await Item.destroy({
        where: {
          orderId: req.params.orderId,
          productId: req.params.productId
        }
      })
      const status = numAffectedRows > 0 ? 204 : 404
      res.status(status).end()
    } else {
      res.status(403).end()
    }
  } catch (err) {
    console.error(err)
    next(err)
  }
})

// get an order
router.get('/:userId/orders/:orderId/', async (req, res, next) => {
  try {
    if (req.params.userId == req.user.id) {
      //|| req.user.isAdmin
      // get order
      const order = await Order.findOne({
        where: {
          orderId: req.params.orderId
        }
      })

      res.json(order)
    } else {
      res.status(403).end()
    }
  } catch (error) {
    console.error(error)
    next(error)
  }
})

// edit an order
router.put('/:userId/orders/:orderId/', async (req, res, next) => {
  try {
    if (req.params.userId == req.user.id) {
      //|| req.user.isAdmin
      // console.log(`---------hi`)
      // get order
      const order = await Order.findOne({
        where: {
          id: req.params.orderId
        }
      })
      // console.log(`---------order: ${order}`)

      // update order
      const updatedOrder = await order.update({
        totalPrice: req.body.totalPrice,
        isPurchased: req.body.isPurchased,
        datePurchased: req.body.datePurchased
      })
      // console.log(`---------updated: ${updatedOrder}`)

      res.json(updatedOrder)
    } else {
      res.status(403).end()
    }
  } catch (error) {
    console.error(error)
    next(error)
  }
})

// get an item
router.get('/:userId/orders/:orderId/:productId', async (req, res, next) => {
  try {
    if (req.params.userId == req.user.id) {
      //|| req.user.isAdmin
      // get item
      const item = await Item.findOne({
        where: {
          orderId: req.params.orderId,
          productId: req.params.productId
        }
      })

      res.json(item)
    } else {
      res.status(403).end()
    }
  } catch (error) {
    console.error(error)
    next(error)
  }
})

// edit item
router.put('/:userId/orders/:orderId/:productId', async (req, res, next) => {
  try {
    if (req.params.userId == req.user.id) {
      //|| req.user.isAdmin
      // get item
      const item = await Item.findOne({
        where: {
          orderId: req.params.orderId,
          productId: req.params.productId
        }
      })

      // update item
      const updatedItem = await item.update({
        quantity: req.body.quantity,
        purchasePrice: req.body.purchasePrice
      })

      // newItem = {
      //   id: updatedItem.productId,
      //   name: product.name,
      //   description: product.description,
      //   stock: product.stock,
      //   price: product.price,
      //   purchasePrice: null,
      //   quantity,
      //   imgUrl: product.imgUrl,
      // }

      res.json({
        id: updatedItem.productId,
        purchasePrice: updatedItem.purchasePrice,
        quantity: updatedItem.quantity,
      })
    } else {
      res.status(403).end()
    }
  } catch (error) {
    console.error(error)
    next(error)
  }
})
