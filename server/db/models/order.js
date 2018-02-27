const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: 1
        }
        
    }
})
//we're gonna seed hooks and setters here
// see comments below

module.exports = Order;


/*
Orders must belong to a user OR guest session (authenticated vs unauthenticated)
Orders must contain line items that capture the price, current product ID and quantity
If a user completes an order, that order should keep the price of the item at the time when they checked out even if the price of the product later changes

*/
