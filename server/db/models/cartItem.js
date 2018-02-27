const Sequelize = require('sequelize')
const db = require('../db')

const CartItem = db.define('cartItem', {
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: 1
        }
    }
    // scopes: {
    //     allProducts: {
    //         include: [
    //             {
    //                 model: db.model('product'),
    //                 through: {
    //                     attributes: ['orderId', 'productId'],
    //                     where: { orderId: this.id }
    //                 }
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