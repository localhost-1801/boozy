const router = require('express').Router()
const {Order, Product, User, CartItem} = require('../db/models')
module.exports = router

//api/orders
router.get('/', (req, res, next) => {
  Order.findAll({
    include: [
      {model: Product},
      {model: User, attributes: ['id', 'email']}
    ],
  })
})

//api/orders/id
router.get('/:id', (req, res, next) => {
  Order.findOne({
    where: {id: req.paramsid}
  })
    .then(orders => res.json(orders))
    .catch(next)
})

//api/orders
router.post('/', (req, res, next) => {
  Order.create(req.body)
    .then(result => res.json(result))
    .catch(next)
})

// //api/orders/id/cartItems
// router.get('/:id/cartItems', (req, res, next) => {
//   // Order.findOne({
//   //   where: {
//   //     id: req.params.id
//   //   }
//   // })
//   //   .then(order => {
      
//   //   })
//   CartItem.findAll({

//     where: {
//       orderId: req.params.id
//     }
//   })
// })
