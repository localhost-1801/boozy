const Sequelize = require('sequelize')
const db = require('../db')
const Product = require('./product')

const CartItem = db.define('cartItem', {
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: 1
        }
    },
    // scopes: {
    //     allProducts: {
    //         include: [
    //             {
    //                 model: Product,
    //                 // through: {
    //                 //     attributes: ['cartId', 'productId'],
    //                 //     where: { cartId: this.id }
    //                 // }
    //             }
    //         ]
    //     }
    // },
    // getterMethods: {
    //     totalPrice() {
    //         // return this.quantity
    //     }
    // }
})



module.exports = CartItem;
