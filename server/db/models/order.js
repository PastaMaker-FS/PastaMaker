const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  datePurchased: {
    type: Sequelize.DATE,
    allowNull: true
  },
  isPurchased: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
})

module.exports = Order;
