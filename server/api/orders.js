const router = require('express').Router()
const { Order, Product, User, CartItem, Cart } = require('../db/models')
const Secrets = require('../auth/secrets')
// const mailgun = require("mailgun-js");
module.exports = router

//api/orders/:userId
router.get('/:userId', (req, res, next) => {
  Cart.findAll({
    where: { userId: +req.params.userId },
     include: [{model: Product}]
  }).then(orders => res.json(orders))
    .catch(next)
})

//api/orders/single/:userId/:id
router.get('/single/:userId/:id', (req, res, next) => {
  Order.findOne({
    where: { id: req.params.id, userId: req.params.userId }
  })
    .then(orders => res.json(orders))
    .catch(next)
})

//api/orders
router.post('/', (req, res, next) => {
  Order.create(req.body)
    .then(result => {
      return (res.json(result))
    })
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
