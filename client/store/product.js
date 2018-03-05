import axios from 'axios';
import history from '../history'
/**
 * ACTION TYPES
 */
const GET_PRODUCT = 'GET_PRODUCT';
const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
const CREATE_PRODUCT = 'CREATE_PRODUCT';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
/**
 * INITIAL STATE
 */
const defaultProduct = {};
/**
 * ACTION CREATORS
 */
const getProduct = product => ({ type: GET_PRODUCT, product });
const removeProduct = (id) => ({ type: REMOVE_PRODUCT, id });
const createProduct = productToAdd => ({ type: CREATE_PRODUCT, productToAdd })
const updateProduct = product => ({ type: UPDATE_PRODUCT, product })
/**
 * THUNK CREATORS
 */
export const fetchProduct = (id) =>
    dispatch =>
        axios.get(`/api/products/${id}`)
            .then(res => dispatch(getProduct(res.data)))
            .catch(err => console.log(err))

export const removeProductThunk = (id) =>
    dispatch =>
        axios.delete(`/api/products/${id}`)
            .then(res => dispatch(removeProduct(res.data || defaultProduct)))
            .catch(err => console.log(err))

export const createProductThunk = (productToAdd) =>
    dispatch =>
        axios.post('/api/products', productToAdd)
            .then(res => dispatch(createProduct(res.data)))
            .then(() => history.push('/products'))
            .catch(err => console.log(err))

export const updateProductThunk = (product, id) =>
    dispatch =>
        axios.put(`/api/products/${id}`, product)
        .then(res => dispatch(updateProduct(res.data || defaultProduct)))
        .catch(err => console.log(err))



/**
* REDUCER
*/
export default function (state = defaultProduct, action) {
    switch (action.type) {
        case GET_PRODUCT:
            return action.product;
        case REMOVE_PRODUCT:
            return action.id; //not sure if this is right? maybe return empty object?
        case CREATE_PRODUCT:
            return [action.productToAdd, ...state] //need to push this into the store for productS
        case UPDATE_PRODUCT:
            return action.product //nor this
        default:
            return state
    }
}
