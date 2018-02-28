// /api/cart/~
const router = require('express').Router()
const {Order, Product, User, CartItem, Cart} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
    //assuming cookies will work
    const cookieToken = 'abc'
    Cart.findOne({
        where: {
            token: cookieToken
        },
        include: [
            {model: Product, through: CartItem}
        ]
    })
    //.then(something => res.json(something))
    // .then(cart => {
    //     CartItem.findAll({
            
    //         where: {
    //             cartId: cart.id
    //         },
    //         include:[{model: Product}]
            
    //     })
        .then(cartItems => {
            console.log(cartItems)
            res.json(cartItems)
        })
        .catch(err => {console.log(err)})
    })

   
    
