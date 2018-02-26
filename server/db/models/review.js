const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
    body: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            len: [3, 100]
        }
    },
    rating: {
        type: Sequelize.INTEGER,
        validate: {
            min: 0,
            max: 5,
        }
    }
})

module.exports = Review;