const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const db = require('../db');

const ProductTag = require('../models/ProductTag');
const ProductType = require('../models/ProductType');

//Note Price is stored as Integer. Front end needs to handle Decimal Places.
const Product = db.define('product', {
	name: {
		type: Sequelize.STRING,
    allowNull: false
    //CG: prevent empty string here. 
	},
	description: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	price: {
		type: Sequelize.INTEGER,
		allowNull: false //CG: This should have minimum and maximum
  },
  //CG: Consider adding quantity / stock. 
	imgUrl: {
		type: Sequelize.STRING,
    allowNull: false
    //CG: Maybe have a default value representing some sort of placeholder image.
	}
});

//Associations
Product.hasMany(ProductTag);
Product.hasMany(ProductType);

ProductTag.belongsTo(Product);
ProductType.belongsTo(Product);

//Class Methods
//Find Products of a Tag
//productTag is an Array of Tags

//CG: We don't necessarily need this method it's made for us. 
ProductTag.findProducts = function (productTag) {
  return Product.findAll({
      where: {
        productTag: {[Op.contains]: productTag}
      }
  })
}

ProductType.findProducts = function (productType) {
  return Product.findAll({
    where: {
      productType: {[Op.contains]: productType}
    }
  })
}


//Instance Methods
//Find Tags of a Product

//We need to check if this a: nessesary (maybe we can eager load) or
//How ID is being stored on the table.

Product.prototype.findTags = function () {
  return ProductTag.findAll({
    where: {
      ProductId: this.Id
    }
  })
}

Product.prototype.findTypes = function () {
  return ProductType.findAll({
    where: {
      ProductId: this.Id
    }
  })
}


module.exports = Product;
