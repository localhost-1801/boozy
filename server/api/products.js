const router = require('express').Router()
const { Product, Category } = require('../db/models')
module.exports = router


// /api/products/
router.get('/', (req, res, next) => {
    Product.findAll({include: [
        {model: Category, through: 'ProdCatJoin'}
    ]})
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

// api/products
router.post('/', (req, res, next) => {
    Product.create(req.body)
        .then(product => res.json(product))
        .catch(next)
})

//api/products/:id
router.put('/:id', (req, res, next) => {
    req.product.update(req.body)
        .then(product => res.json(product))
        .catch(next)
})


//api/products/:id
router.delete('/:id', (req, res, next) => {
    req.product.destroy()
        .then(() => res.sendStatus(204))
        .catch(next);
});


//Will need additional routes for filtering, maybe
