const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
    created: {
        type: Sequelize.ENUM('Order created', null),
        defaultValue: null
    },
    processing: {
        type: Sequelize.ENUM('In processing...', null),
        defaultValue: null
    },
    completed: {
        type: Sequelize.ENUM('Order has been completed', 'Order has been cancelled'),
        defaultValue: null 
    }
})

//total price would be a function that returns price of items times quantity FOR each item

//we're gonna seed hooks and setters here
// see comments below

module.exports = Order;


/*
Orders must belong to a user OR guest session (authenticated vs unauthenticated)
Orders must contain line items that capture the price, current product ID and quantity
If a user completes an order, that order should keep the price of the item at the time when they checked out even if the price of the product later changes

*/


// const Order = db.define('order', {
//     quantity: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//         validate: {
//             min: 1
//         }
//     }

// })
