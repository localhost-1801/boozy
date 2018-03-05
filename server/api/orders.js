const router = require('express').Router()
const { Order, Product, User, CartItem } = require('../db/models')
const Secrets = require('../auth/secrets')
// const mailgun = require("mailgun-js");
const api_key = process.env.MAILGUN_TOKEN;
const DOMAIN = 'http://127.0.0.1:8080/';
const mailgun = require('mailgun-js')({apiKey: api_key, domain: DOMAIN});
module.exports = router

//api/orders/:userId
router.get('/:userId', (req, res, next) => {
  Order.findAll({
    where: { userId: req.params.userId },
     // include: [
     //   { model: Cart },
      // { model: User, attributes: ['id', 'email'] }
    // ],
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
  Order.create(req.body.orderDetail)
    .then(result => {
      var data = {
        from: 'Boozy',
        to: req.body.email,
        subject: 'Conifrming your order',
        text: 'This E-mail is confirming your recent order with boozy winery'
      };
      mailgun.messages.send(data, function (error, body){
          console.error(error);
      })
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
