import axios from 'axios';

//ACTION TYPES

const GET_CART = 'GET_CART';

//INITIAL STATE

const defaultCart = [];

//ACTION CREATORS

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

//REDUCERS

export default function (state = defaultCart, action) {
    switch (action.type) {
        case GET_CART:
            return action.cart
        default:
            return state
    }
}