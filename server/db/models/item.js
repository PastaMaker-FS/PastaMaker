const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('item', {
  purchasePrice: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: null
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
})

module.exports = Order;
