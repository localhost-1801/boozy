// /api/cart/~
const router = require('express').Router()
const { Order, Product, User, CartItem, Cart } = require('../db/models')
const Hashids = require('hashids')
const hashids = new Hashids()
module.exports = router

router.get('/', (req, res, next) => {
    //assuming cookies will work
    const cookieToken = 'abc'
    Cart.findOne({
        where: {
            token: cookieToken
        },
        include: [
            { model: Product, through: CartItem }
        ]
    })
        .then(cartItems => {
            console.log(cartItems)
            res.json(cartItems)
        })
        .catch(err => { console.log(err) })
})

//api/cart
router.post('/', (req, res, next) => {
    //use cookie to generate a cart token, not sure if you need to create off of req.body
    Cart.create(req.body, {
        include: [
            { model: Product, through: CartItem }
        ]
    })
        .then(newCart => {
          let cartHash = hashids.encode(newCart.id);
          newCart.update({token: cartHash})
          req.cookie = cartHash;
          res.json(newCart)
        })
        .catch(next);
})

//api/cart
router.put('/', (req, res, next) => {
    //not sure if cart will be on the request body?
    // req.cart.update(req.body, {
    //     include: [
    //         { model: Product, through: CartItem }
    //     ]
    // })
    //     .then(modifiedCart => res.json(modifiedCart))
    //     .catch(next);

    CartItem.findOne({
      where: {
        cartId: hashids.decode(req.body.token)[0],
        productId: req.body.productId
      }
    }).then( res => {
      if (res) {
        let quantity = req.body.quantity.add ? res.quantity + req.body.quantity.value : req.body.quantity.value;
        console.log('in if statement')
        res.update({quantity})
      } else {
        console.log('in else statement')
        CartItem.create({productId: req.body.productId, cartId: hashids.decode(req.body.token)[0], quantity: req.body.quantity.value})
      }
    })
    .catch(next);
})

//api/cart
router.delete('/', (req, res, next) => {
    //not sure if cart will be on the request body?
    req.cart.destroy()
        .then(() => res.status(204).send('Cart has been cleared'))
        .catch(next);
})


// Should NOT be able to get cart by ID
// should be able to post a new cart
//should be able to update a cart
//should be able to delete a cart in its entirity
