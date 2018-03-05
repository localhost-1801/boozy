const router = require('express').Router()
const { Product, Category } = require('../db/models')
module.exports = router

//done
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
    Product.findById(req.params.id)
        .then(product => res.json(product))
        .catch(next)
})

// api/products
router.post('/', (req, res, next) => {
    Product.create(req.body)
        .then(product => res.status(201).json(product))
        .catch(next)
})

//api/products/:id
router.put('/:id', (req, res, next) => {
    let id = req.params.id;
    Product.update(req.body, {
        where: { id: id }
    })
        .then(product => res.json(product))
        .catch(next)
})

//api/products/:id
router.delete('/:id', (req, res, next) => {
    let id = req.params.id;
    Product.destroy({
        where: { id }
    })
        .then(() => res.sendStatus(204))
        .catch(next);
});


//Will need additional routes for filtering, maybe
