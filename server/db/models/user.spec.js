const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody;

      beforeEach(() => {
        return User.create({
          email: 'cody@puppybook.com',
          username: 'cody',
          isAdmin: false,
          password: '123'
        })
          .then(user => {
            cody = user
          })
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('123')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('1234')).to.be.equal(false)
      })
    })
  })
})
