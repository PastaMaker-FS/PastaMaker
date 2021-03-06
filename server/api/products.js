const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

//gets all products including associated Types and Tags
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (error) {
    next(error)
  }
})

//get single product
router.get('/:productId', async (req, res, next) => {
  const id = req.params.productId
  try {
    const singleProduct = await Product.findById(id)
    res.json(singleProduct)
  } catch (error) {
    next(error)
  }
})

//post new products only allowed by Admin
router.post('/', async (req, res, next) => {
  const checkAdmin = req.body.user.isAdmin
  const name = req.body.name
  const description = req.body.description
  const price = req.body.price
  const imgUrl = req.body.imgUrl
  try {
    if (checkAdmin) {
      const newProduct = await Product.findOrCreate({
        where: {
          name,
          description,
          price,
          imgUrl
        }
      })
      res.json(newProduct[0])
    } else {
      res.sendStatus(401)
    }
  } catch (error) {
    next(error)
  }
})

//update products only allowed by Admin
router.put('/:productId', async (req, res, next) => {
  const checkAdmin = req.body.user.isAdmin
  const id = req.params.productId
  const name = req.params.name
  const description = req.params.description
  const price = req.params.price
  const imgUrl = req.params.imgUrl
  try {
    if (checkAdmin) {
      await Product.update(
        {
          name,
          description,
          price,
          imgUrl
        },
        {
          where: {
            id
          }
        }
      )
      const update = await Product.findById(id)
      res.json(update)
    } else {
      res.sendStatus(401)
    }
  } catch (error) {
    next(error)
  }
})

//delete product only allow by Admin
router.delete('/:productId', async (req, res, next) => {
  const id = req.params.productId
  const checkAdmin = req.body.user.isAdmin
  try {
    if(checkAdmin){
      const remove = await Product.destroy({
        where: {
          id
        }
      })
      res.json(remove)
    }else{
      res.sendStatus(401)
    }
  } catch (error) {
    next(error)
  }
})
