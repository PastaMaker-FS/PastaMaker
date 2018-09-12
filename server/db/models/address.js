const Sequelize = require('sequelize')
const db = require('../db')

const Address = db.define('address', {
  street: {
    type: Sequelize.STRING,
    allowNull: false
  }, //CG: We may want to validate for empty strings as well.
  city: {
    type: Sequelize.STRING,
    allowNull: false
  } ,
  state: {
    type: Sequelize.STRING,
    allowNull: false
  },
  zip: {
    type: Sequelize.STRING,
    allowNull: false
  }
})
//CG: Hook maybe to see that fields haven't been ALL duplicated.

module.exports = Address
