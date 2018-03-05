const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
    token: {
        type: Sequelize.STRING
    },
    status: {
        type: Sequelize.ENUM('unordered', 'processing', 'sent', 'delivered')
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    date: {
        type: Sequelize.STRING
    }

})

module.exports = Cart;
