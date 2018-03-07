// /api/cart/~
const router = require('express').Router()
const { Order, Product, User, CartItem, Cart } = require('../db/models')
const Hashids = require('hashids')
const hashids = new Hashids()
module.exports = router

 //api/cart/:token
router.get('/:token', (req, res, next) => {
    //assuming cookies will work
    const cookieToken = req.params.token
    Cart.findOne({
        where: {
            token: cookieToken
        },
        include: [
            { model: Product, through: CartItem }
        ]
    })
        .then(cartItems => {
            res.json(cartItems)
        })
        .catch(err => { console.error(err) })
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
            newCart.update({ token: cartHash })
            req.cookie = cartHash;
            res.json(newCart)
        })
        .catch(next);
})
router.put('/:id', (req, res, next) => {
  Cart.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(cart => {
      console.log('we made it to the API: ', cart)
      cart.update(req.body)
        .then(newCart => {
          Cart.findAll({
            include: [{model: Product}]
          })
            .then(orders => res.json(orders))
            .catch(next)
        })
      return cart.update(req.body)
    })
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
    //takes a few cart paramaters: productId, and quantity object
    //quantity object: {add: true/false, value: quantity}
    let cartIdFromHash = hashids.decode(req.cookies.cart)[0];
    CartItem.findOne({
      where: {
        cartId: cartIdFromHash,
        productId: req.body.productId
      }
    }).then(found => {
      if (found) {
        let quantity = req.body.quantity.add ? found.quantity + req.body.quantity.value : req.body.quantity.value;
        found.update({quantity, purchasePrice: req.body.purchasePrice})
        .then( async updatedItem => {
            // const product = await Product.findOne({
            //     where: {
            //         id: updatedItem.dataValues.productId
            //     },
            //     include: [
            //         { model: CartItem },
            //       ]
            // })
            // return res.json(updatedItem)
            return Cart.findOne({
                where: {
                    id: cartIdFromHash
                },
                include: [
                    { model: Product, through: CartItem }
                ]
            })
                .then(cartItems => {
                    res.json(cartItems)
                })
        })
      } else {
        CartItem.create({productId: req.body.productId, cartId: cartIdFromHash, quantity: req.body.quantity.value, purchasePrice: req.body.purchasePrice})
        .then(newItem => {
            res.json(newItem)
        })
      }
    })
        .catch(next);
})

//api/cart/cartItem
router.delete('/cartItem/:prodId/:cartId', async (req, res, next) => {
    const productId = req.params.prodId
    // const cartId = hashids.decode(req.cookies.cart)[0];
    const cartId = req.params.cartId
    const cartItemToDelete = await CartItem.findOne({
        where: {
            productId: productId,
            cartId: cartId
        }
    })
    cartItemToDelete.destroy()
        .then( nothing => res.json({productId: productId, cartId: cartId}))
})

//api/cart
router.delete('/', (req, res, next) => {
    //not sure if cart will be on the request body?
    req.cart.destroy()
        .then(() => res.status(204).send('Cart has been cleared'))
        .catch(next);
})


// should NOT be able to get cart by ID
// should be able to post a new cart
//should be able to update a cart
//should be able to delete a cart in its entirity
//test
