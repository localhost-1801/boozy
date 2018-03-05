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
            password: '123',
            isAdmin: true
        },
        {
            email: 'TEST2@TEST2.com',
            username: 'I am not an alcoholic',
            password: '123',
            isAdmin: false
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
            available: 'available'
            //categoryId: 1
        },
        {
            title: 'FAKE RED WINE',
            description: 'THIS IS RED WINE',
            price: '10.00',
            inventory: '1018',
            year: '2018',
            imageUrl: 'https://www.fillmurray.com/200/300',
            available: 'available'
            //categoryId: 2
        },
        {
            title: 'Chardonnay',
            description: 'Chardonnay or Should I Go?',
            price: '10.00',
            inventory: '1018',
            year: '2018',
            imageUrl: 'https://www.fillmurray.com/200/300',
            available: 'available'
            //categoryId: 1
        },
        {
            title: 'Riesling',
            description: 'Everything happens for a riesling',
            price: '10.00',
            inventory: '1018',
            year: '2018',
            imageUrl: 'https://www.fillmurray.com/200/300',
            available: 'available'
            //categoryId: 1
        },
        {
            title: 'Moscato',
            description: 'Hakuna Moscato',
            price: '10.00',
            inventory: '1018',
            year: '2018',
            imageUrl: 'https://www.fillmurray.com/200/300',
            available: 'available'
            //categoryId: 1
            // categories: [
            //     {id: 1},
            //     {id: 2}
            // ]
        },
        {
            title: 'Merlot',
            description: 'Is it Merlot you are looking for?',
            price: '10.00',
            inventory: '1018',
            year: '2018',
            imageUrl: 'https://www.fillmurray.com/200/300',
            available: 'available'
            //categoryId: 2
        },
        {
            title: 'Pinot Noir',
            description: 'After drinking this, you will be as useful as the "t" in Pinot Noir',
            price: '10.00',
            inventory: '1018',
            year: '2018',
            imageUrl: 'https://www.fillmurray.com/200/300',
            available: 'available'
            //categoryId: 2
        },
        {
            title: 'Cabernet Sauvignon',
            description: 'I got nothing',
            price: '10.00',
            inventory: '1018',
            year: '2018',
            imageUrl: 'https://www.fillmurray.com/200/300',
            available: 'unavailable'
            //categoryId: 2
        },
    ]

const orderDBseed =
    [
        {
            userId: 1,
            status: 'created',
            address: '221 B Baker St',
            cartId: 1,
            date: '09/01/1995'

        },
        {
            userId: 2,
            status: 'created',
            address: 'White House',
            cartId: 2,
            date: '08/07/1993'
        },
        {
            userId: 1,
            status: 'created',
            address: '42 Wallaby Way, Sydney'
        },
        {
            userId: 2,
            status: 'created',
            address: '742 Evergreen Terrace'
        }
    ]

const categoryDBseed =
    [
        {
            name: 'white'
        },
        {
            name: 'red'
        },
        {
            name: 'dry'
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
const prodCatDummyData =
    [
        {
            productId: 1,
            categoryId: 1,
        },
        {
            productId: 2,
            categoryId: 1,
        },
        {
            productId: 2,
            categoryId: 2,
        }
    ]

const seed = async () => {
    try {
        const user = await Promise.all(userDBseed.map(user => User.create(user)))
        const category = await Promise.all(categoryDBseed.map(category => Category.create(category)))
        const cart = await Promise.all(cartDummyData.map(cart => Cart.create(cart)))
        const product = await Promise.all(productDBseed.map(product => Product.create(product)))
        const review = await Promise.all(reviewDBseed.map(review => Review.create(review)))
        const cartItem = await Promise.all(cartDBseed.map(cartItem => CartItem.create(cartItem)))
        const order = await Promise.all(orderDBseed.map(order => Order.create(order)))
        // console.log('product', product[0]);
        // console.log('category', category[0]);
        // console.log('product: ',product[0], 'category: ', category[1])
        // await product[0].setCategories(category[1]);
        // await product.map(async (prod, i )=> {
        //     const prodJoin = await prod.setCategories(category[1])
        //     return prodJoin
        // })
        for (let i = 0; i<product.length; i++) {
            await product[i].setCategories(category[i % category.length])
        }


    } catch(err) {
        console.error(err)
    }


    // .then(() => //not sure how to populate a join table
    //     Promise.all(prodCatDummyData.map(prodCat =>
    //         ProdCatJoin.create(prodCat)
    //     )))
}
// Promise.all(userDBseed.map(user =>
//     User.create(user))
// )
//     .then(() =>
//         Promise.all(categoryDBseed.map(category =>
//             Category.create(category))
//         ))
//     .then(() => //not sure how to populate a join table
//         Promise.all(cartDummyData.map(cart =>
//             Cart.create(cart)
//         )))
//     .then(() =>
//         Promise.all(productDBseed.map(product =>
//             Product.create(product))

//         ))
//     .then(() =>
//         Promise.all(reviewDBseed.map(review =>
//             Review.create(review))
//         ))
//     .then(() =>
//         Promise.all(orderDBseed.map(order =>
//             Order.create(order))
//         ))
//     .then(() => //not sure how to populate a join table
//         Promise.all(cartDBseed.map(cartItem =>
//             CartItem.create(cartItem)
//         )))
// // .then(() => //not sure how to populate a join table
// //     Promise.all(prodCatDummyData.map(prodCat =>
// //         ProdCatJoin.create(prodCat)
// //     )))




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
