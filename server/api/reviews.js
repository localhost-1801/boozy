const router = require('express').Router()
const {Review, Product, User} = require('../db/models')
module.exports = router

//api/reviews
router.get('/', (req, res, next) => {
  Review.findAll({
    include: [
      {model: Product},
      {model: User, attributes: ['id', 'e-mail']}
    ],
  })
})

//api/reviews/id
router.get('/:id', (req, res, next) => {
  Review.findOne({
    where: {id: req.paramsid}
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
