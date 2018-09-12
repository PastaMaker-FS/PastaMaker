const Sequelize = require('sequelize');
const db = require('../db');

//Note Price is stored as Integer. Front end needs to handle Decimal Places.
const ProductType = db.define('ProductType', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

module.exports = ProductType;
