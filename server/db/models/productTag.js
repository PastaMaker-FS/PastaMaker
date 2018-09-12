const Sequelize = require('sequelize');
const db = require('../db');

//Note Price is stored as Integer. Front end needs to handle Decimal Places.
const ProductTag = db.define('ProductTag', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

module.exports = ProductTag;
