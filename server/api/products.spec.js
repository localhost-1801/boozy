'use strict';

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
    it('GET /api/products', () => {
    let productTest = Product.build({
        title: 'A title',
        description: 'A wine',
        price: 12.20,
        inventory: 10,
        year: 1992,
        imageURL: 'https://www.fillmurray.com/200/300'
    });

    return productTest.save().then(function () {

      return request(app)
        .get('/api/products')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an.instanceOf(Array)
          expect(res.body[0].title).to.be.equal('A title')
        })
      })
    })
  })
})
