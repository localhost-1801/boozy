import axios from 'axios';
//import history from '../history'
/**
 * ACTION TYPES
 */
const GET_PRODUCT = 'GET_PRODUCT';
const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
/**
 * INITIAL STATE
 */
const defaultProduct = {};
/**
 * ACTION CREATORS
 */
const getProduct = product => ({ type: GET_PRODUCT, product });
const removeProduct = () => ({ type: REMOVE_PRODUCT });
/**
 * THUNK CREATORS
 */
export const fetchProduct = (productId) =>
    dispatch =>
        axios.get(`/product/${productId}`)
            .then(res =>
                dispatch(getUser(res.data || defaultProduct)))
            .catch(err => console.log(err))
/**
* REDUCER
*/
export default function (state = defaultProduct, action) {
    switch (action.type) {
        case GET_PRODUCT:
            return action.product;
        case REMOVE_PRODUCT:
            return defaultProduct;
        default:
            return state
    }
}