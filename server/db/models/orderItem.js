const Sequelize = require('sequelize')
const db = require('../db')
const Product = require('./product')

const OrderItem = db.define('cartItem', {
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: 1
        }
    },
})



module.exports = OrderItem;
