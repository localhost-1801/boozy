const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    inventory: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    year: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    imageURL: {
        type: Sequelize.STRING,
        defaultValue: 'https://www.fillmurray.com/200/300'
    }
})

export default Product;