'use strict';

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Review = db.model('review')
const User = db.model('user')
const Product = db.model('product')

describe('Review routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/reviews/', () => {
    it('GET /api/reviews', async () => {
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

      let reviewTest = await Review.create({
        body: 'this wine is pretty good. alright it was only okay',
        rating: 4,
      })

      reviewTest.setUser(userTest)
      reviewTest.setProduct(productTest)

    let res = await request(app)
        .get('/api/reviews')
          expect(res.body).to.be.an.instanceof(Array)
          expect(res.body[0].rating).to.be.equal(4)
        })
      })
    })

