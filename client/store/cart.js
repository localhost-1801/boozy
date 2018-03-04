import axios from 'axios';

//ACTION TYPES

///NEED TO FIX TO FILTER BY PRODUCT ID;

const GET_CART = 'GET_CART';
const ADD = 'ADD_TO_CART';
const REMOVE = 'REMOVE_FROM_CART';

//INITIAL STATE

const defaultCart = {};

//ACTION CREATORS

const add = (productToAdd) => ({ type: ADD, productToAdd })
const getCart = cart => ({ type: GET_CART, cart })
const remove = (productToRemove) => ({ type: REMOVE, productToRemove })

//THUNK CREATORS

export const fetchCart = (cookieToken) =>
    dispatch =>
        axios.get('/api/cart')
            .then(res => {
                return (
                    dispatch(getCart(res.data || defaultCart))
                )
            })
            .catch(err => console.log(err));

export const addProductToCart = (productToAdd) =>
    dispatch =>
        axios.put('/api/cart', productToAdd)
            .then(res => {
                return (
                    dispatch(add(res.data))
                )
            })
            .catch(err => console.error(err));

export const removeProductToCart = (productToRemove) =>
    dispatch =>
        axios.put('/api/cart', productToRemove)
            .then(res => {
                return (
                    dispatch(remove(res.data))
                )
            })
            .catch(err => console.error(err));



//REDUCERS

//REDUCERS

export default function (state = defaultCart, action) {
    switch (action.type) {
        case GET_CART:
            return action.cart
        case ADD:
            return action.add
        case REMOVE:
            return action.remove
        default:
            return state
    }
}

//test