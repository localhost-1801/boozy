'use strict';

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    it('GET /api/users', () => {
    let userTest = User.build({
      email: 'cody@puppybook.com',
      username: 'cody',
      isAdmin: false,
      password: '123'
    })

    return userTest.save().then(function (){

      return request(app)
        .get('/api/users')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an.instanceof(Array)
          expect(res.body[0].email).to.be.equal('cody@puppybook.com')
        })
      })
    })
  })
})
