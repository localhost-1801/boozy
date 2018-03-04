import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './user';
import products from './products';
import product from './product';
import orders from './orders';
import cart from './cart';
import reviews from './reviews';
import categories from './categories';
import users from './users';


const reducer = combineReducers({ user, products, product, orders, cart, reviews, categories, users })
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
))

const store = createStore(reducer, middleware)


export default store
export * from './user'

//test