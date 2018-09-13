const Sequelize = require('sequelize')
const db = require('../db')

const Address = db.define('address', {
  street: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  zip: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})
  // hooks: {
  //   beforeValidate: (address) => {
  //     if(address.street && address.city && address.state && address.zip) {
  //       return "Unique Address Required!"
  //     }
  //     if()
  //   }
  // }


module.exports = Address
