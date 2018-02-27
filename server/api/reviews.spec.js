const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Review = db.model('review')

describe('Order routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/reviews/', () => {
    const wineRating = 4;
    const reviewText = "This wine was pretty good, kind of ok, not bad";

    beforeEach(() => {
      return Review.create({
        body: reviewText,
        rating: wineRating,
      })
    })

    it('GET /api/reviews', () => {
      return request(app)
        .get('/api/reviews')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].wineRating).to.be.equal(wineRating)
        })
    })
  }) // end describe('/api/reviews')
}) // end describe('review routes')
