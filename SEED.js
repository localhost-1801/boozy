const Sequelize = require('sequelize');
const Promise = require('bluebird');
//don't forget to npm install bluebird
const { User, Review, Product, Order, Category } = require('./server/db/models');
const db = require('./server/db');

const userDBseed =
    [
        {
            email: 'test@test.com',
            password: '123'
        },
        {
            email: 'TEST2@TEST2.com',
            password: '123'
        }
    ]

const reviewDBseed =
    [
        {
            body: 'This is a good review',
            rating: 5,
            productId: 1,
            userId: 1
        },
        {
            body: 'This is a bad review',
            rating: 0,
            productId: 2,
            userId: 2
        }
    ]

const productDBseed =
    [
        {
            title: 'FAKE WHITE WINE',
            description: 'THIS IS WHITE WINE',
            price: '10.00',
            inventory: '1018',
            year: '2018',
            imageUrl: 'https://www.fillmurray.com/200/300',
            categoryId: 1
        },
        {
            title: 'FAKE RED WINE',
            description: 'THIS IS RED WINE',
            price: '10.00',
            inventory: '1018',
            year: '2018',
            imageUrl: 'https://www.fillmurray.com/200/300',
            categoryId: 2
        },
    ]

const orderDBseed =
    [
        {
            quantity: 1
        },
        {
            quantity: 1
        }
    ]

const categoryDBseed =
    [
        {
            color: 'white'
        },
        {
            color: 'red'
        }
    ]

const seed = () =>
  Promise.all(userDBseed.map(user =>
    User.create(user))
  )
  .then(() =>
  Promise.all(reviewDBseed.map(review =>
    Review.create(review))
  ))
  .then(() =>
  Promise.all(productDBseed.map(product =>
    Product.create(product))
  ))
  .then(() =>
  Promise.all(orderDBseed.map(order =>
    Order.create(order))
  ))
  .then(() =>
  Promise.all(categoryDBseed.map(category =>
    Category.create(category))
  ))


const main = () => {
    console.log('Syncing db...');
    db.sync({ force: true })
      .then(() => {
        console.log('Seeding database...');
        return seed();
      })
      .catch(err => {
        console.log('Error while seeding');
        console.log(err.stack);
      })
      .then(() => {
        db.close();
        return null;
      });
  };

  main();