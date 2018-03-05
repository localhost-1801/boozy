import axios from 'axios'
import history from '../history'

//ACTION TYPES

const GET_PRODUCTS = 'GET_PRODUCTS'
const ADD = 'ADD_PRODUCTS'
const UPDATE = 'UPDATE_PRODUCT'
//INITIAL STATE

const defaultProducts = []

//Action creators

const add = (productToAdd) => ({ type: ADD, productToAdd })
const getProducts = products => ({ type: GET_PRODUCTS, products })
const update = product => ({ type: UPDATE, product })


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

//Reducer
export default function (state = defaultProducts, action) {
    switch (action.type) {
        case GET_PRODUCTS:
            return action.products
        case ADD:
            return [action.productToAdd, ...state]
        case UPDATE:
            return state.map(product => ( action.id === product.id ? action.product : product))
        default:
            return state
    }
}
