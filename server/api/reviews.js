const router = require('express').Router()
const { Review, Product, User } = require('../db/models')
module.exports = router

//api/reviews
router.get('/', (req, res, next) => {
  Review.findAll({
    include: [
      { model: Product },
      { model: User, attributes: ['id', 'e-mail'] }
    ],
  })
})


//api/reviews/p/:productId/
router.get('/p/:productId', (req, res, next) => {
  Review.findAll({
    where: { productId: req.params.productId },
    include: [
      { model: Product },
      { model: User}
    ],
  })
  .then(reviews => res.json(reviews))
  .catch(next)
})


//api/reviews/id
router.get('/:id', (req, res, next) => {
  Review.findOne({
    where: { id: req.params.id }
  })
    .then(reviews => res.json(reviews))
    .catch(next)
})

//api/reviews
router.post('/', (req, res, next) => {
  Review.create(req.body)
    .then(result => res.json(result))
    .catch(next)
})

//reviews shouldn't be deleted nor updated
