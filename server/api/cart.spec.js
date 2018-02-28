const { expect } = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Cart = db.model('cart')

describe('Cart routes', () => {
    beforeEach(() => {
        return db.sync({ force: true })
    })

    describe('/api/cart/', () => {
        const cartToken = "Super secret series: Serious secret"

        beforeEach(() => {
            return Cart.create({
                token: cartToken
            })
        })
        
        it('GET /api/cart', () => {
            return request(app)
                .get('/api/cart')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('array') 
                    expect(res.body[0].token).to.be.equal(cartToken)
                })
        })
    }) // end describe('/api/cart')
}) // end describe('cart routes')
