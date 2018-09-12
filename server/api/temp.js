const router = require('express').Router()
const {Products, Orders} = require('../db/models')

api.get('/', (req, res, next) => {
    // if(req.query) 
})

api.get('/orders', (req, res, next) => {
    const where = {};
    if(req.query.date === 'today'){
        whereObj.createdAt = {
            [Op.gt]: new Date().
        }
    }

    Order.findAll({
        where
    })
})

api.get('/users/:userId/orders', (req, res, next) => {
    if(req.user && req.user.isAdmin){
        Order.findAll({

        })
    } else if(req.user && req.user.id === req.params.id){

    } else {
        res.status(401).send('Unauthorized');
    }
}) //order history

api.get('/users/:userId/cart')



module.exports = router