const User = require('./user')
const Order = require('./order')
const Item = require('./item')
const Address = require('./address')
const Product = require('./product')
const ProductTag = require('./productTag')
const ProductType = require('./productType')
const About = require('./about')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
Order.belongsToMany(Product, {through: 'item'});
Product.belongsToMany(Order, {through: 'item'});

User.hasOne(Address)
User.hasMany(Order)

Address.belongsTo(User)

Product.hasMany(ProductTag);
Product.hasMany(ProductType);

ProductTag.belongsTo(Product);
ProductType.belongsTo(Product);

//Product Instance Methods:
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


/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Order,
  Item,
  Address,
  Product,
  ProductTag,
  ProductType,
  About
}
