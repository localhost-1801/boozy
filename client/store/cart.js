import axios from 'axios';

//ACTION TYPES

///NEED TO FIX TO FILTER BY PRODUCT ID;

const GET_CART = 'GET_CART';
const ADD = 'ADD_TO_CART';
<<<<<<< HEAD
const REMOVE = 'REMOVE_FROM_CART'
=======
const REMOVE = 'REMOVE_FROM_CART';
>>>>>>> master

//INITIAL STATE

const defaultCart = {};

//ACTION CREATORS

const add = (productToAdd) => ({ type: ADD, productToAdd })
const getCart = cart => ({ type: GET_CART, cart })
<<<<<<< HEAD
const remove = (payload) => ({type: REMOVE, payload})
=======
const remove = (productToRemove) => ({ type: REMOVE, productToRemove })
>>>>>>> master


//THUNK CREATORS

export const fetchCart = (cookieToken) =>
    dispatch =>
        axios.get(`/api/cart/${cookieToken}`)
            .then(res => {
                return (
                    dispatch(getCart(res.data || defaultCart))
                )
            })
            .catch(err => console.log(err));

export const addProductToCart = (productToAdd) =>
<<<<<<< HEAD
  dispatch =>
    axios.put('/api/cart', productToAdd )
      .then(res =>{
          console.log('in store:',res.data)
        return (
          dispatch(add(res.data))
        )
      })
    .catch(err => console.error(err));
//Should take productId, and get cartId from cookie
export const removeProductFromCart = (payload) =>
      dispatch =>{
        console.log('in store, here is payload',payload)
        axios.delete(`/api/cart/cartItem/${payload.productId}/${payload.cartId}`)
        .then(ids => {
            
            dispatch(remove(ids.data))
        })
        .catch(err => console.error(err))
      }
        
=======
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


>>>>>>> master

    
//REDUCERS

//REDUCERS

export default function (state = defaultCart, action) {
    switch (action.type) {
        case GET_CART:
            return action.cart
        case ADD:
<<<<<<< HEAD
            console.log(action.productToAdd)
            return Object.assign({}, state, action.productToAdd)
        case REMOVE:
            
            return Object.assign({}, state, {
                products: state.products.filter(product => {
                   return product.id !== +action.payload.productId
                })
            })
=======
            return action.add
        case REMOVE:
            return action.remove
>>>>>>> master
        default:
            return state
    }
}

//test