const Sequelize = require('sequelize');
const db = require('../db');
const crypto = require('crypto')

const Order = db.define('order', {
  orderNumber: {
    type: Sequelize.STRING,
    allowNull: false
  },
  datePurchased: {
    type: Sequelize.DATE,
    allowNull: true
  },
  totalPrice: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  isPurchased: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
    defaultValue: false
  }
})

Order.beforeValidate(function(user, options) {
  user.orderNumber = crypto.randomBytes(16).toString('base64')
})

module.exports = Order;
