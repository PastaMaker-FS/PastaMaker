const router = require('express').Router()
const {product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await product.findAll();
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:typeId', async (req, res, next) => {
  try {
const products = await product.findAll({
  where: {
    
  }
})
  } catch (error) {

  }
})
