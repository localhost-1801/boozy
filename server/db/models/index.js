const Sequelize = require('sequelize');

const User = require('./user')
const Product = require('./product');
const Order = require('./order');
const Category = require('./category');
const Review = require('./review');
const db = require('../db');
const CartItem = require('./cartItem');
// const ProdCatJoin = require('./prodCatJoin')
const Cart = require('./cart')

//potential issue later with circular dependencies, maybe
Product.belongsToMany(Cart, { foreignKey: 'productId', through: CartItem });
Cart.belongsToMany(Product, { foreignKey: 'cartId', through: CartItem })
Product.belongsToMany(Category, { foreignKey: 'productId', through: "ProdCatJoin" })
Category.belongsToMany(Product, { foreignKey: 'categoryId', through: 'ProdCatJoin' })
Product.hasMany(Review);
Review.belongsTo(Product);
Review.belongsTo(User);
User.hasMany(Order);
Cart.hasOne(Order); //adds cart column to Order
// Order.hasMany(Product)





//User.hasMany(Review); //if we want to implement later

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

module.exports = {
  db,
  User,
  Product,
  Order,
  Category,
  Review,
  CartItem,
  Cart

}
