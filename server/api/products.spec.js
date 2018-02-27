/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products/', () => {
    // const codysEmail = 'cody@puppybook.com'
    const testProduct = {
        title: 'A title',
        description: 'A wine',
        price: 12.20,
        inventory: 10,
        year: 1992,
    }

    beforeEach(() => {
      return Product.create(testProduct)
    })

    it('GET /api/products', () => {
      return request(app)
        .get('/api/products')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0]).to.be.equal(testProduct)
        })
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
