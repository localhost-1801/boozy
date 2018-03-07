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
            isAdmin: false,
        },
        {
            email: 'ADMIN@ADMIN.COM',
            username: 'I AM AN ADMIN',
            password: '123',
            isAdmin: true
        },
        {
            email: 'ADMIN@ADMIN.ADMIN',
            username: 'I AM AN ADMIN',
            password: '123',
            isAdmin: true
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
    const rawProductData =
    [
        {
            title: 'Zaccagnini Montepulciano',
            description: 'Intense violet robe. Aromas of plum and ripe blackberry. Each sip delivers a mouthful of ripe berries, leather and black pepper with subtle hints of oregano, dried herbs and a touch of vanilla; all leading to a dry and supple finish.',
            price: '27.00',
            inventory: '1000',
            year: '2013',
            imageURL: 'https://drizly-products0.imgix.net/ci_2228.jpg?auto=format%2Ccompress&fm=jpeg&q=20',
            available: 'available'
        },
        {
            title: 'Tilia Malbec',
            description: 'Aromas of black cherries and plums are accompanied by notes of violets and vanilla. On the palate the wine is rich and full-bodied with flavors of juicy blackberries, cranberries, and black currants abound, followed by notes of vanilla and sweet spice.',
            price: '18.00',
            inventory: '2000',
            year: '2015',
            imageURL: 'https://drizly-products1.imgix.net/ci_289.jpg?auto=format%2Ccompress&fm=jpeg&q=20',
            available: 'available'
        },
        {
            title: 'Punto Final Malbec',
            description: 'Deep ruby red in color with notes of blackberry, blueberry and cassis. On the palate, the wine is balanced and round, with a jammy mouthfeel and a long finish.    Pair with steak, pasta with meat sauce, risotto, lamb and cheeses.',
            price: '23.00',
            inventory: '1500',
            year: '2013',
            imageURL: 'https://drizly-products1.imgix.net/ci_4051.jpg?auto=format%2Ccompress&fm=jpeg&q=20',
            available: 'available'
        },
        {
            title: 'Educated Guess Cabernet Sauvignon',
            description: 'The Educated Guess Cabernet Sauvignon is crafted from grapes grown in the prestigious Napa Valley wine districts of Yountville, Oak Knoll, Calistoga, Oakville, and Rutherford. Created with the philosophy that superb Napa Valley Cabernet Sauvignon can be affordable, this wine is indistinguishable in quality from its higher-priced Napa Valley competitors.',
            price: '30.00',
            inventory: '1018',
            year: '2016',
            imageURL: 'https://drizly-products3.imgix.net/ci_educated_guess_cabernet_sauvignon_8cac4ff61dc5a496.jpeg?auto=format%2Ccompress&fm=jpeg&q=20',
            available: 'available'
        },
        {
            title: 'Mark West Pinot Noir',
            description: 'Showing a fine combination of ripe, red fruit and sweet oak, this medium bodied Mark West Pinot Noir stays right in there as a fine example of the varietal.',
            price: '26.00',
            inventory: '1018',
            year: '2012',
            imageURL: 'https://drizly-products3.imgix.net/ci_mark_west_pinot_noir_9dd7cfd74fb70f01.jpeg?auto=format%2Ccompress&fm=jpeg&q=20',
            available: 'available',
        },
        {
            title: 'Carnivor Cabernet Sauvignon',
            description: 'Big and bold in style, Carnivor Cabernet Sauvignon offers intense, dark fruit aromas and deep, inky color. A plush, velvety mouthfeel frames rich flavors of dark berries, coffee, mocha and toasted oak, all backed by a distinctive smoothness and a lingering, silky finish.',
            price: '20.00',
            inventory: '1018',
            year: '2012',
            imageURL: 'https://drizly-products1.imgix.net/ci_2399.jpg?auto=format%2Ccompress&fm=jpeg&q=20',
            available: 'available'
        },
        {
            title: 'Meiomi Pinot Noir',
            description: 'Dark, deep garnet color. Sumptuous aromas of ripe berries, vanilla and spicy oak. Upon entry, the mouth is coated with a velvety richness, but the acidity enlivens the weight and pops the flavors. The senses will pick up light roasted almond, cranberry, raspberries with ever so a hint of barnyard complexity-earthy and gamey. Underlined with a sweet oak character, mocha and cola. An extremely layered Wine both in structure and flavor. These textured layers emerge independently, and then rejoin beautifully into a rounded, rich and supple wine with a succulent finish.',
            price: '40.00',
            inventory: '1018',
            year: '2014',
            imageURL: 'https://drizly-products0.imgix.net/ci_910.jpg?auto=format%2Ccompress&fm=jpeg&q=20',
            available: 'available'
        },
        {
            title: '19 Crimes Red Blend',
            description: 'Dark red and maroon hues extend from the core of the glass as dark fruits, licorice and spice linger. The Shiraz is the brooding component that brings the core of dark fruits, licorice and round ripe tannins. The Grenache is focussed in the red and blue fruits spectrum and delivers plushness to the final blend. Last but definitely not least the Mataro brings the spice and finer tannins pulling the structure together and giving the wine drive. The resultant wine is complex and layered in a soft approachable style.',
            price: '22.00',
            inventory: '1018',
            year: '2012',
            imageURL: 'https://drizly-products1.imgix.net/ci_1765.jpg?auto=format%2Ccompress&fm=jpeg&q=20',
            available: 'available'
        },
        {
            title: 'Dark Horse Cabernet Sauvignon',
            description: 'The New World Cab that just cannot stop exceeding expectations. This full-throttle bottle is a true Dark Horse original. Bringing together a carefully selected collection of California grapes, winemaker, Beth Liston has found a way to balance big fruit flavors with deep, dry, mouthwatering notes. An instant hit, our Cab loves any party or holiday gathering where there’s a chance to mingle with all kinds of tastes.',
            price: '15.00',
            inventory: '1018',
            year: '2015',
            imageURL: 'https://drizly-products0.imgix.net/ci_12925.png?auto=format%2Ccompress&fm=jpeg&q=20',
            available: 'available'
        },
        {
            title: 'The Pinot Project Pinot Noir',
            description: 'Mission accomplished! The Pinot Project has accomplished its goal of being one of the greatest red wine values coming out of California. It is hand-crafted from grapes grown in notable AVAs such as Sonoma County, Carneros & Monterey. The Pinot Project has a full and silky mouth feel, with just the right amount of acidity to complement a variety of dishes. The wine is 100% stainless steel fermented with the caps receiving periodic punchdowns, before finishing dry with just a kiss of oak.',
            price: '22.00',
            inventory: '1018',
            year: '2015',
            imageURL: 'https://drizly-products3.imgix.net/ci_235.jpg?auto=format%2Ccompress&fm=jpeg&q=20',
            available: 'available'
        },
        {
            title: 'Alamos Malbec',
            description: 'A classically Argentine wine that thrives in Mendoza’s high altitudes, our Alamos Malbec blends the deeply concentrated plum flavors of the country’s signature variety–Malbec–with small portions of Syrah and Bonarda to add dark cherry and blackberry flavors. Well-integrated hints of brown spice and vanilla contribute layers of complexity. A full structure, firm tannins and a long finish create an expansive palate that is hard to forget. With crisp, clean air and intense sunlight, growing conditions in Mendoza are truly ideal for Malbec.',
            price: '18.00',
            inventory: '1018',
            year: '2013',
            imageURL: 'https://drizly-products3.imgix.net/ci_601.png?auto=format%2Ccompress&fm=jpeg&q=20',
            available: 'available'
        },
        {
            title: 'Josh Cellars Cabernet Sauvignon',
            description: 'The bouquet is rich with dark fruits, cinnamon, clove and toasty oak flavors. The wine is juicy on the palate with blackcurrant and blackberry flavors prominent, accented by roasted almonds, vanilla and hazelnuts, finishing long with fine, firm tannins.',
            price: '25.00',
            inventory: '1018',
            year: '2015',
            imageURL: 'https://drizly-products3.imgix.net/ci_20877.jpeg?auto=format%2Ccompress&fm=jpeg&q=20',
            available: 'unavailable'
        },

        {
            title: 'Starborough Sauvignon Blanc',
            description: 'Evocative of the luscious Marlborough region, this Starborough Sauvignon Blanc has refreshing flavors of citrus and tropical fruits with notes of fresh-cut grass. Layers of passion fruit, guava and kiwi create a crisp, approachable palate.',
            price: '24.00',
            inventory: '1018',
            year: '2015',
            imageURL: 'https://drizly-products0.imgix.net/ci_starborough_sauvignon_blanc_466187b582cf1601.png?auto=format%2Ccompress&fm=jpeg&q=20',
            available: 'available'
        },
        {
            title: 'Santa Margherita Pinot Grigio',
            description: 'Santa Margherita Pinot Grigio is the benchmark by which all other Pinot Grigios are judged. The wine boasts a fresh, clean fragrance that is followed by a crisp, refreshing flavor with hints of citrus fruits. This wine is well-structured and sophisticated, a perfect choice for entertaining!',
            price: '50.00',
            inventory: '1018',
            year: '2014',
            imageURL: 'https://drizly-products0.imgix.net/ci_4458.png?auto=format%2Ccompress&fm=jpeg&q=20',
            available: 'available'
        },
        {
            title: 'Cupcake Sauvignon Blanc',
            description: 'Sourced from the South Island of New Zealand, this Sauvignon Blanc exhibits complexity and a vibrant zing. Flavors of Meyer lemons and Key limes integrate with hints of grapefruit, gooseberry and citrus, culminating in a long, creamy finish. Long, cool seasons in New Zealand’s Marlborough region allow our grapes to mature slowly and gain character and complexity. The grapes are harvested at night and gently crushed before undergoing cool fermentation in stainless steel tanks. An extended fermentation sur lie adds richness and softness, complementing the fruit’s natural zest and acidity.',
            price: '16.00',
            inventory: '1018',
            year: '2013',
            imageURL: 'https://drizly-products0.imgix.net/ci_2900.jpg?auto=format%2Ccompress&fm=jpeg&q=20',
            available: 'available'
        },
        {
            title: 'Matua Sauvignon Blanc',
            description: 'All the varietal zing you’d expect from the granddaddies of Sauv Blanc in New Zealand. Look at it in a glass – it’s just about singing with freshness. The lively nose shows tropical and citrus fruits with subtle herbaceous characters. Its crisp fresh palate offers classic Marlborough acidity, structure and length.',
            price: '20.00',
            inventory: '1018',
            year: '2015',
            imageURL: 'https://drizly-products0.imgix.net/ci_1621.png?auto=format%2Ccompress&fm=jpeg&q=20',
            available: 'available'
        },
        {
            title: 'Cavit Pinot Grigio',
            description: 'The best Pinot Grigio comes from Italy. Cavit Pinot  Grigio has light, refreshing flavors of citrus and   green apple, and is the #1 Italian Wine in America*.',
            price: '20.00',
            inventory: '1018',
            year: '2012',
            imageURL: 'https://drizly-products3.imgix.net/ci_cavit_pinot_grigio_38037095056066cf.jpeg?auto=format%2Ccompress&fm=jpeg&q=20',
            available: 'unavailable'
        },
    ]

    const productDBseed = rawProductData.map((product, index) => {
        let category = index < 12 ? 'red' : 'white'
        let dry = index % 3 ? true: false
        return {
            product: product,
            category: category,
            dry: dry
        }

    })
// const productDBseed =
//     [
//         {product: {
//             title: 'Reserve Syrah Alder Springs',
//             description: 'Ruby/brick color, medium density. Surprisingly delicate floral aromas of violets and lilies offset with subtle hickory smoke, sweet basil and a slightly gamy note. Mossy earth, herbs and dusty tannins up front yield to dark plum, vanilla bean, and toasty oak on the mid-palate. Finishes a bit tight but will open up with 10 minutes in the glass. With gentle but firm tannins and good acidity this would be a natural pairing with pork or gamy fowl.',
//             price: '32.00',
//             inventory: '1000',
//             year: '2013',
//             imageURL: 'http://www.citywinery.com/media/catalog/product/cache/4/image/480x420/040ec09b1e35df139433887a97daa66f/2/0/2013_syrah_reserve_alder_springs_vineyard.png',
//             available: 'available'
//         }, category: 'red'},
//         {product: {
//             title: 'Reserve Merlot Napa Valley',
//             description: 'Ruby color. Aromas of ripe plum, rose hips and cloves. Lively, bright entry on the palate. Flavors of Damascus plums, dried cherries, tar, pine sap and juniper with secondary sweet spice and purple flower fragrance emerging on the finish.',
//             price: '32.00',
//             inventory: '2000',
//             year: '2015',
//             imageURL: 'http://www.citywinery.com/media/catalog/product/cache/4/image/480x420/040ec09b1e35df139433887a97daa66f/2/0/2012_cab_obsidian.png',
//             available: 'available'
//         }, category: 'red'},
//         {product: {
//             title: 'Lakeshore Pinot Noir, Central Coast, California',
//             description: 'Pale garnet color. Translucent. A delicate nose of bing cherry and guava fruit complimented by sweet purple flower (Iris), spearmint and faint pine tar notes. A deft entry opens on the mid-palate with cherry pit, melon and citrus flavors followed by black tea, anise, bay leaf and a lingering oily smokiness. Light or light/medium in body. A wine defined by savory textures and earthy flavors.',
//             price: '26.00',
//             inventory: '1500',
//             year: '2013',
//             imageURL: 'http://www.citywinery.com/media/catalog/product/cache/4/image/480x420/040ec09b1e35df139433887a97daa66f/2/0/2013_pinot_noir_lakeshore_hyland_vineyard.png',
//             available: 'available'
//         }, category: 'red'},
//         {product: {
//             title: 'Sauvignon Blanc, Morgan Station',
//             description: '100% tank fermented. Brilliantly clear. Asian pear skin color. Stone fruit (peach/apricot), and ripe cantaloupe aromas with lemon custard overtones. More substantial on the palate than previous vintages. Ripe red apple, caraway seed, rye toast and marmalade on the palate. Good breadth and persistence.',
//             price: '18.00',
//             inventory: '1018',
//             year: '2016',
//             imageURL: 'http://www.citywinery.com/media/catalog/product/cache/4/image/480x420/040ec09b1e35df139433887a97daa66f/2/0/2016_morgan_1.png',
//             available: 'available'
//         }, category: 'red'},
//         {product: {
//             title: 'Pinot Noir Reserve, Bien Nacido Vineyard, Santa Maria Valley, CA.',
//             description: 'Classic Santa Barbara County Pinot Noir- silky and polished with ripe cherry and raspberry fruit, tomato leaf and sweet sage aromatic notes finishing with baking spices and smooth tannins on the lingering finish. This was a six barrel selection from 23 barrel of Bien Nacido Vineyard Pinot Noir.  This wine also received 90 points through Wine Enthusiast! ',
//             price: '32.00',
//             inventory: '1018',
//             year: '2012',
//             imageURL: 'http://www.citywinery.com/media/catalog/product/cache/4/image/420x420/040ec09b1e35df139433887a97daa66f/2/0/2012_bien_nacido_reserve_pinot_noir.png',
//             available: 'available',
//         }, category: 'red', dry: true},
//         {product: {
//             title: 'Reserve Pinot Noir Hyland Vineyard',
//             description: '2012 was an exeptional Pinot Noirl vintage in the Willamette Valley. The Hyland Reserve diplays great concentration on the nose with blue and red berries, cassis, damp earth, and focused tannins all dancing harmoniously on the palate. Still evolving in the bottle this wine will only improve in the next 3-5 years.',
//             price: '32.00',
//             inventory: '1018',
//             year: '2012',
//             imageURL: 'http://www.citywinery.com/media/catalog/product/cache/4/image/420x420/040ec09b1e35df139433887a97daa66f/2/0/2012_pinot_noir_reserve_hyland_vineyard_1.png',
//             available: 'available'
//         }, category: 'red'},
//         {product: {
//             title: 'Pinot Noir Reserve Hyland Vineyard 2014',
//             description: 'Vintage and resulting wine more similar to the 2012 Hyland than the delicate 2013 vintage. Medium dense robe, candied apple hue. Pomegranate, strawberry-guava and tart cherry fruit on the nose with redwood, juniper, and lightly toasted oak notes. Linear and focused on the palate; the wine enters smooth as spring water with flavors emerging on the mid-palate of tart cherries, green tobacco leaves, and sage. Grainy, earthy, and rustic. Still very young and tight. For the wine geek. The 2014 Crane Canyon Pinot Noir is much easier drinking but the Hyland prompts questions profound for those with the patience to ponder.',
//             price: '32.00',
//             inventory: '1018',
//             year: '2014',
//             imageURL: 'http://www.citywinery.com/media/catalog/product/cache/4/image/040ec09b1e35df139433887a97daa66f/2/0/2014_pinot_noir_reserve_hyland_vineyard_1.png',
//             available: 'available'
//         }, category: 'red', dry: true},
//         {product: {
//             title: 'Heartbreaker Pinot Noir',
//             description: '2012 was an exceptional Pinot Noir vintage in the Willamette Valley. The Hyland Reserve displays great concentration on the nose with blue and red berries, cassis, damp earth, and focused tannins all dancing harmoniously on the palate. Still evolving in the bottle this wine will only improve in the next 3-5 years.',
//             price: '32.00',
//             inventory: '1018',
//             year: '2012',
//             imageURL: 'http://www.citywinery.com/media/catalog/product/cache/4/image/480x420/040ec09b1e35df139433887a97daa66f/h/e/heartbreaker.png',
//             available: 'available'
//         }, category: 'red', dry: true},
//         {product: {
//             title: 'COVFEFE Wine',
//             description: 'This particular bottle represents an expression of values that we hold dear: looking outward, seeing the humanity in others, and sharing wine in an open-minded spirit. 20% of each sale will be donated to the ACLU. Wine notes: Ruby color.  Aromas of ripe plum, rose hips and cloves.  Lively, bright entry on the palate.  Flavors of Damascus plums, dried cherries, tar, pine sap and juniper with secondary sweet spice and purple flower fragrance emerging on the finish.',
//             price: '32.00',
//             inventory: '1018',
//             year: '2015',
//             imageURL: 'http://www.citywinery.com/media/catalog/product/cache/4/image/420x420/040ec09b1e35df139433887a97daa66f/2/0/2015_covfefe_2.png',
//             available: 'available'
//         }, category: 'red'},
//         {product: {
//             title: 'Reserve Pinot Noir Verna Vineyard CA',
//             description: 'Light hue and opacity in the glass -- cherry apple red. Raspberry jam, iris and a hint of camphor on the nose. Vibrant red berry fruits upon the entry complimented by savory thyme and bay leaf flavors on the mid palate. Finished with toasted nuts, anise and juicy tannins. Pretty, polished and easy drinking Pinot Noir.',
//             price: '32.00',
//             inventory: '1018',
//             year: '2015',
//             imageURL: 'http://www.citywinery.com/media/catalog/product/cache/4/image/480x420/040ec09b1e35df139433887a97daa66f/2/0/2015_verna.png',
//             available: 'available'
//         }, category: 'red'},
//        { product: {
//             title: 'Pinot Noir Alder Springs Vineyard Reserve',
//             description: 'Deep ruby, purple rim. Rich red fruit nose, like raspberry coulis. Spice notes of clove and white pepper. Mouthfeel is broad. Flavors of red apple skin and red grapefruit.',
//             price: '32.00',
//             inventory: '1018',
//             year: '2013',
//             imageURL: 'http://www.citywinery.com/media/catalog/product/cache/4/image/040ec09b1e35df139433887a97daa66f/2/0/2013_aldersprings_1.png',
//             available: 'available'
//         }, category: 'red', dry: true},
//         {product: {
//             title: 'Mystery Cabernet Sauvignon Napa Valley CA',
//             description: 'Deep sanguine / ruby color. Seductive and multi-faceted nose of cherry preserves, cassis, fig compote, fresh bell pepper, vanilla bean and sweet tropical flowers. A classic Rutherford Bench Cabernet Sauvignon. Silky entry with abundant dark berry flavors leavened by anise and clove notes all hovering effortlessly over a base of polished tannins, barrel toast, and bacon fat. Exception breadth and persistence on the palate. Paradoxically, this is a wine of such transparent pleasure that one may gulp it without savoring its complexity and length. Savor it. 14 months in French oak, 20% new barrels. Racked once.',
//             price: '35.00',
//             inventory: '1018',
//             year: '2015',
//             imageURL: 'http://www.citywinery.com/media/catalog/product/cache/4/image/480x420/040ec09b1e35df139433887a97daa66f/m/y/mystery_wine_.png',
//             available: 'unavailable'
//         }, category: 'red', dry: true},

//         {product: {
//             title: 'Starborough Sauvignon Blanc',
//             description: 'Evocative of the luscious Marlborough region, this Starborough Sauvignon Blanc has refreshing flavors of citrus and tropical fruits with notes of fresh-cut grass. Layers of passion fruit, guava and kiwi create a crisp, approachable palate.',
//             price: '24.00',
//             inventory: '1018',
//             year: '2015',
//             imageURL: 'https://drizly-products0.imgix.net/ci_starborough_sauvignon_blanc_466187b582cf1601.png?auto=format%2Ccompress&fm=jpeg&q=20',
//             available: 'available'
//         }, category: 'white'},
//         {product: {
//             title: 'Santa Margherita Pinot Grigio',
//             description: 'Santa Margherita Pinot Grigio is the benchmark by which all other Pinot Grigios are judged. The wine boasts a fresh, clean fragrance that is followed by a crisp, refreshing flavor with hints of citrus fruits. This wine is well-structured and sophisticated, a perfect choice for entertaining!',
//             price: '50.00',
//             inventory: '1018',
//             year: '2014',
//             imageURL: 'https://drizly-products0.imgix.net/ci_4458.png?auto=format%2Ccompress&fm=jpeg&q=20',
//             available: 'available'
//         }, category: 'white'},
//         {product: {
//             title: 'Cupcake Sauvignon Blanc',
//             description: 'Sourced from the South Island of New Zealand, this Sauvignon Blanc exhibits complexity and a vibrant zing. Flavors of Meyer lemons and Key limes integrate with hints of grapefruit, gooseberry and citrus, culminating in a long, creamy finish. Long, cool seasons in New Zealand’s Marlborough region allow our grapes to mature slowly and gain character and complexity. The grapes are harvested at night and gently crushed before undergoing cool fermentation in stainless steel tanks. An extended fermentation sur lie adds richness and softness, complementing the fruit’s natural zest and acidity.',
//             price: '16.00',
//             inventory: '1018',
//             year: '2013',
//             imageURL: 'https://drizly-products0.imgix.net/ci_2900.jpg?auto=format%2Ccompress&fm=jpeg&q=20',
//             available: 'available'
//         }, category: 'white', dry: true},
//         {product: {
//             title: 'Matua Sauvignon Blanc',
//             description: 'All the varietal zing you’d expect from the granddaddies of Sauv Blanc in New Zealand. Look at it in a glass – it’s just about singing with freshness. The lively nose shows tropical and citrus fruits with subtle herbaceous characters. Its crisp fresh palate offers classic Marlborough acidity, structure and length.',
//             price: '20.00',
//             inventory: '1018',
//             year: '2015',
//             imageURL: 'https://drizly-products0.imgix.net/ci_1621.png?auto=format%2Ccompress&fm=jpeg&q=20',
//             available: 'available'
//         }, category: 'white'},
//         {product: {
//             title: 'Cavit Pinot Grigio',
//             description: 'The best Pinot Grigio comes from Italy. Cavit Pinot  Grigio has light, refreshing flavors of citrus and   green apple, and is the #1 Italian Wine in America*.',
//             price: '20.00',
//             inventory: '1018',
//             year: '2012',
//             imageURL: 'https://drizly-products3.imgix.net/ci_cavit_pinot_grigio_38037095056066cf.jpeg?auto=format%2Ccompress&fm=jpeg&q=20',
//             available: 'unavailable'
//         }, category: 'white', dry: true},
//     ]

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
            quantity: 10,
            purchasePrice: 12
        }
    ]
const cartDummyData =
    [
        {
            token: 'abc',
            userId: 1,
            address: '123 lane lavenswood junolyville san carolifcia'
        },
        {
            token: 'dcfdasdf',
            userId: 2,
            address: '123 lane lavenswood junolyville san carolifcia'
        },
        {
            token: 'hello',
            userId: 1,
            address: '123 lane lavenswood junolyville san carolifcia'
        },
        {
            token: 'mO',
            userId: 1,
            address: '123 lane lavenswood junolyville san carolifcia'
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
        let productsMade = [];
        for (let i = 0; i < productDBseed.length; i++){
            let created = await Product.create(productDBseed[i].product)
            productsMade.push(created)
            // await productsMade.push(Product.create(productDBseed[i].product))
        }
        const white = await Category.create(categoryDBseed[0])
        const red = await Category.create(categoryDBseed[1])
        const dry = await Category.create(categoryDBseed[2])
        const user = await Promise.all(userDBseed.map(user => User.create(user)))
        // const category = await Promise.all(categoryDBseed.map(category => Category.create(category)))
        const cart = await Promise.all(cartDummyData.map(cart => Cart.create(cart)))
        // const product = await Promise.all(productDBseed.map(productObj => Product.create(productObj.product)))
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
        for (let i = 0; i< productsMade.length; i++){
            if (productDBseed[i].category === 'white') {
                await productsMade[i].addCategories(white)
            } else {
                await productsMade[i].addCategories(red)
            }
            if (productDBseed[i].dry){
                await productsMade[i].addCategories(dry)
            }
        }


        // for (let i = 0; i<product.length; i++) {
        //     await product[i].setCategories(category[i % category.length])
        // }


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


//test
