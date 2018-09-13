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
    allowNull: true,
    defaultValue: 1,
    validate: { min: 0 }
  }
})

module.exports = Order;
