'use strict';

const { expect } = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Cart = db.model('cart')
const Review = db.model('review')
const User = db.model('user')
const Product = db.model('product')

describe('Cart routes', () => {
    beforeEach(() => {
        return db.sync({ force: true })
    })

    describe('/api/cart/:token', () => {
        it('GET /api/cart/:token', async () => {
            let userTest = await User.create({
                email: 'cody@puppybook.com',
                username: 'cody',
                isAdmin: false,
                password: '123'
              })

              let productTest = await Product.create({
                title: 'A title',
                description: 'A wine',
                price: 12.20,
                inventory: 10,
                year: 1992,
                imageURL: 'https://www.fillmurray.com/200/300'
            });

            let cartTest = await Cart.create({
                token: 'abc'
            })
            let res = await request(app)
                .get('/api/cart/abc')
                    expect(res.body).to.be.an.instanceof(Object)
                    expect(res.body.token).to.be.equal('abc')
                })
            })
        })

