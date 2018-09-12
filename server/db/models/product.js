const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const db = require('../db');

const ProductTag = require('../models/ProductTag');
const ProductType = require('../models/ProductType');

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

//Associations
Product.hasMany(ProductTag);
Product.hasMany(ProductType);

ProductTag.belongsTo(Product);
ProductType.belongsTo(Product);

//Class Methods

//Already given to us. Saving so that we can return to it later if needed.

// ProductTag.findProducts = function (productTag) {
//   return Product.findAll({
//       where: {
//         productTag: {[Op.contains]: productTag}
//       }
//   })
// }

// ProductType.findProducts = function (productType) {
//   return Product.findAll({
//     where: {
//       productType: {[Op.contains]: productType}
//     }
//   })
// }


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
