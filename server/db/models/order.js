const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  dateCreated: {
    type: Sequelize.DATE,
    allowNull: false
  },
  status: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
})

module.exports = Order;
