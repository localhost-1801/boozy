const router = require('express').Router()
const User = require('../db/models/user')
module.exports = router
//import history from '../../../client/components/history'

router.post('/login', (req, res, next) => {

  User.findOne({ where: { email: req.body.email } })
    .then(user => {
      if (!user) {
        res.status(401).send('User not found')
      } else if (!user.correctPassword(req.body.password)) {
        res.status(401).send('Incorrect password')
      } else {
        if (user.changePassFlag === true) {
          user.changePassFlag = false;
          req.login(user, err => (err ? next(err) : res.json(user)))
        } else { 
          req.login(user, err => (err ? next(err) : res.json(user)))
        }
      }
    })
    .catch(next)
})

router.post('/signup', (req, res, next) => {
  User.create(req.body)
    .then(user => {
      req.login(user, err => (err ? next(err) : res.json(user)))
    })
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(401).send('User already exists')
      } else {
        next(err)
      }
    })
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))
