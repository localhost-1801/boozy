import axios from 'axios';

//ACTION TYPES

const GET_CART = 'GET_CART';
const ADD = 'ADD_TO_CART';

//INITIAL STATE

const defaultCart = [];

//ACTION CREATORS

const add = (productToAdd) => ({type: ADD, productToAdd})
const getCart = cart => ({ type: GET_CART, cart })


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
    axios.put('/api/cart', productToAdd )
      .then(res =>{
        return (
          dispatch(add(res.data))
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
        default:
            return state
    }
}
