const Sequelize = require('sequelize');
const Promise = require('bluebird');
//don't forget to npm install bluebird
const { User, Review, Product, Order, Category, CartItem, Cart } = require('./server/db/models');
const db = require('./server/db');

const userDBseed =
    [
        {
            email: 'test@test.com',
            username: 'BOOZY MCBOOZYFACE',
            password: '123'
        },
        {
            email: 'TEST2@TEST2.com',
            username: 'I am not an alcoholic',
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
        {
            title: 'Chardonnay',
            description: 'Chardonnay or Should I Go?',
            price: '10.00',
            inventory: '1018',
            year: '2018',
            imageUrl: 'https://www.fillmurray.com/200/300',
            categoryId: 1
        },
        {
            title: 'Riesling',
            description: 'Everything happens for a riesling',
            price: '10.00',
            inventory: '1018',
            year: '2018',
            imageUrl: 'https://www.fillmurray.com/200/300',
            categoryId: 1
        },
        {
            title: 'Moscato',
            description: 'Hakuna Moscato',
            price: '10.00',
            inventory: '1018',
            year: '2018',
            imageUrl: 'https://www.fillmurray.com/200/300',
            categoryId: 1
        },
        {
            title: 'Merlot',
            description: 'Is it Merlot you are looking for?',
            price: '10.00',
            inventory: '1018',
            year: '2018',
            imageUrl: 'https://www.fillmurray.com/200/300',
            categoryId: 2
        },
        {
            title: 'Pinot Noir',
            description: 'After drinking this, you will be as useful as the "t" in Pinot Noir',
            price: '10.00',
            inventory: '1018',
            year: '2018',
            imageUrl: 'https://www.fillmurray.com/200/300',
            categoryId: 2
        },
        {
            title: 'Cabernet Sauvignon',
            description: 'I got nothing',
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
            userId: 1,
            status: 'created'
        },
        {
            userId: 2,
            status: 'created'
        },
        {
            userId: 1,
            status: 'created'
        },
        {
            userId: 2,
            status: 'created'
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

const cartDBseed =
    [
        {
            productId: 1,
            cartId: 1,
            quantity: 1
        },
        {
            productId: 2,
            cartId: 1,
            quantity: 2
        },
        {
            productId: 2,
            cartId: 2,
            quantity: 10
        }
    ]
const cartDummyData =
    [
        {
            token: 'abc'
        },
        {
            token: 'dcfdasdf'
        },
        {
            token: 'hello'
        }
    ]

const seed = () =>
    Promise.all(userDBseed.map(user =>
        User.create(user))
    )
        .then(() =>
            Promise.all(categoryDBseed.map(category =>
                Category.create(category))
            ))
        .then(() => //not sure how to populate a join table
            Promise.all(cartDummyData.map(cart =>
                Cart.create(cart)
            )))
        .then(() =>
            Promise.all(productDBseed.map(product =>
                Product.create(product))
            ))
        .then(() =>
            Promise.all(reviewDBseed.map(review =>
                Review.create(review))
            ))
        .then(() =>
            Promise.all(orderDBseed.map(order =>
                Order.create(order))
            ))
        .then(() => //not sure how to populate a join table
            Promise.all(cartDBseed.map(cartItem =>
                CartItem.create(cartItem)
            )))
      


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