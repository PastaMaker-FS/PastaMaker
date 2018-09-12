const Sequelize = require('sequelize');
const db = require('../db');

//CG: This should be const Item = ... and also export Item
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
