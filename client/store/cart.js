import axios from 'axios';

//ACTION TYPES

///NEED TO FIX TO FILTER BY PRODUCT ID;

const GET_CART = 'GET_CART';
const ADD = 'ADD_TO_CART';
const REMOVE = 'REMOVE_FROM_CART'

//INITIAL STATE

const defaultCart = {};

//ACTION CREATORS

const add = (productToAdd) => ({ type: ADD, productToAdd })
const getCart = cart => ({ type: GET_CART, cart })
const remove = (payload) => ({type: REMOVE, payload})


//THUNK CREATORS

export const fetchCart = (cookieToken) =>
    dispatch =>
        axios.get(`/api/cart/${cookieToken}`)
            .then(res => {
                return (
                    dispatch(getCart(res.data || defaultCart))
                )
            })
            .catch(err => console.error(err));

export const addProductToCart = (productToAdd) =>
  dispatch =>
    axios.put('/api/cart', productToAdd )
      .then(res =>{
        return (
          dispatch(add(res.data))
        )
      })
    .catch(err => console.error(err));
//Should take productId, and get cartId from cookie
export const removeProductFromCart = (payload) =>
      dispatch =>{
        axios.delete(`/api/cart/cartItem/${payload.productId}/${payload.cartId}`)
        .then(ids => {

            dispatch(remove(ids.data))
        })
        .catch(err => console.error(err))
      }



//REDUCERS

//REDUCERS

export default function (state = defaultCart, action) {
    switch (action.type) {
        case GET_CART:
            return action.cart
        case ADD:
            return Object.assign({}, state, action.productToAdd)
        case REMOVE:

            return Object.assign({}, state, {
                products: state.products.filter(product => {
                   return product.id !== +action.payload.productId
                })
            })
        default:
            return state
    }
}

//test
