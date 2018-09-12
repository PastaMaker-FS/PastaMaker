const Sequelize = require('sequelize');
const db = require('../db');



//Note Price is stored as Integer. Front end needs to handle Decimal Places.
const Product = db.define('product', {
	name: {
    type: Sequelize.STRING,
    validate: {
    notNull: false,
    notEmpty: true
    }
	},
	description: {
    type: Sequelize.TEXT,
    validate: {
      notNull: false,
      notEmpty: true,
    }

  },
  stock: {
    type: Sequelize.INTEGER,
    validate: {
      notNull: false,
      notEmpty: true,
      min: 0,
      max: 1000
    }
  },
	price: {
    type: Sequelize.INTEGER,
    validate: {
      notNull: false,
      notEmpty: true,
      min: 0,
      max: 1000000
    }
	},
	imgUrl: {
    type: Sequelize.STRING,
    defaultValue: "http://assets.stickpng.com/thumbs/589c827a64b351149f22a829.png",
		allowNull: false
	}
});

module.exports = Product;
