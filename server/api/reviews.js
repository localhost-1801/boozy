const router = require('express').Router()
const { Review, Product, User } = require('../db/models')
module.exports = router

//api/reviews
router.get('/', (req, res, next) => {
  Review.findAll({
    include: [
      { model: Product },
      { model: User, attributes: ['id', 'email'] }
    ],
  })
  .then(reviews => res.json(reviews))
  .catch(next)
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
router.post('/', async (req, res, next) => {
  const newReview = await Review.create(req.body)
  const newId = newReview.dataValues.id
  Review.findOne({
    where: {
      id: newId
    },
    include: [
      { model: Product },
      { model: User}
    ],
  })
  .then(result => { res.json(result)})
})

//reviews shouldn't be deleted nor updated
