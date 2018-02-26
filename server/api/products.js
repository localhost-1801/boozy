const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

// /api/products/
router.get('/', (req, res, next) => {
    Product.findAll()
        .then(products => res.json(products))
        .catch(next)
})

// /api/products/id
router.get('/:id', (req, res, next) => {
    Product.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(product => res.json(product))
        .catch(next)
})


//Will need additional routes for filtering
