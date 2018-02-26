const Sequelize = require('sequelize')
const db = require('../db')

const Category = db.define('category', {
    color: {
        type: Sequelize.STRING,
        allowNull: false,
// we may want to validate specfic color of wines later
    },
})

module.exports = Category;