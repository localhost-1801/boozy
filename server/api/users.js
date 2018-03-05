const router = require('express').Router()
const { User } = require('../db/models')
module.exports = router

//api/users/
router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})

//api/users/allUsersStatuses
router.get('/allUsersStatuses', (req, res, next) => {
  User.findAll({
    attributes: ['id', 'email', 'username', 'isAdmin'],
    order: ['username']
  })
    .then(users => res.json(users))
    .catch(next)
})


//api/users/:id
router.get('/:id', (req, res, next) => {
  User.findOne({
    where: { id: req.params.id },
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
});

//api/users/
router.post('/', (req, res, next) => {
  User.create(req.body)
    .then(user => res.status(201).json(
      {
        userId: user.Id,
        username: user.username,
        email: user.email
      }
    ))
    .catch(next);
})

//api/users/:id
router.put('/:id', (req, res, next) => {
  req.user.update(req.body)
    .then(user => res.send("Your password has changed successfully"))
    .catch(next);
});

//api/users/:id
router.delete('/:id', (req, res, next) => {
  User.destroy({
    where: { id: req.params.id }
  })
    .then(() => res.sendStatus(204))
    .catch(next);
});


//api/users/adminStatus/:id
router.put('/adminStatus/:id', (req, res, next) => {
  User.findOne({
    where: { id: req.params.id }
  })
  .then(user => user.update({ isAdmin: req.body.bool}))
  .then(user => res.json(user))
  .catch(next)
})
