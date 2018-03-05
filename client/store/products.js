import axios from 'axios'
import history from '../history'

//ACTION TYPES

const GET_PRODUCTS = 'GET_PRODUCTS'
const ADD = 'ADD_PRODUCTS'
const UPDATE = 'UPDATE_PRODUCT'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
const CREATE_PRODUCT = 'CREATE_PRODUCT';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

//INITIAL STATE

const defaultProducts = [];

//Action creators

const add = (productToAdd) => ({ type: ADD, productToAdd })
const getProducts = products => ({ type: GET_PRODUCTS, products })
const update = product => ({ type: UPDATE, product })
const removeProduct = (id) => ({ type: REMOVE_PRODUCT, id });
const createProduct = product => ({ type: CREATE_PRODUCT, product })


//Thunk creators
export const fetchProducts = () =>
    dispatch =>
        axios.get('/api/products')
            .then(res => {
                return (
                    dispatch(getProducts(res.data || defaultProducts))
                )
            })
            .catch(err => console.log(err))

export const addProduct = productToAdd => dispatch => {
    axios.post('/api/products', productToAdd)
    .then(res => {
        dispatch(add(res.data))

    })
    .then(() => history.push('/products'))
    .catch(err => console.error(err))
}

export const updateProduct = (id, product) => dispatch => {
    axios.put(`/api/products/${id}`, product)
    .then(res => dispatch(update(res.data)))
    .catch(err => console.error(err))
}
export const removeProductThunk = (id) =>
    dispatch =>
        axios.delete(`api/products/${id}`)
            .then(res => dispatch(removeProduct(res.data || defaultProduct)))
            .catch(err => console.log(err))

export const createProductThunk = (product) =>
    dispatch =>
        axios.post(`api/products`, product)
            .then(res => dispatch(createProduct(res.data || defaultProduct)))
            .catch(err => console.log(err))

//Reducer
export default function (state = defaultProducts, action) {
    switch (action.type) {
        case GET_PRODUCTS:
            return action.products
        case ADD:
            return [action.productToAdd, ...state]
        case UPDATE:
            return state.map(product => ( action.id === product.id ? action.product : product))
        case REMOVE_PRODUCT:
            return state.filter(product => product.id !== action.id);
        case CREATE_PRODUCT:
            return [action.product, ...state]
        case UPDATE_PRODUCT:
            return state.map(product => action.product.id === product.id ? action.product : product);
        default:
            return state
    }
}

/*
        case REMOVE_PRODUCT:
            return action.id; //not sure if this is right? maybe return empty object?
        case CREATE_PRODUCT:
            return action.product //need to push this into the store for productS
        case UPDATE_PRODUCT:
            return action.product //nor this
*/
