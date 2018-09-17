const router = require('express').Router()
const {About} = require('../db/models')
module.exports = router

router.get('/', async(req, res, next) => {
  try {
    const about = await About.findAll()
    res.json(about)
  } catch (error) {
    next(error)
  }
})
