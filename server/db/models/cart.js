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
        type: Sequelize.STRING
    },
    date: {
        type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    }
})

module.exports = Cart;
