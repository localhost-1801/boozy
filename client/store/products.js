import axios from 'axios'

//ACTION TYPES

const GET_PRODUCTS = 'GET_PRODUCTS';
const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
const CREATE_PRODUCT = 'CREATE_PRODUCT';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

//INITIAL STATE

const defaultProducts = [];

//Action creators

const getProducts = products => ({ type: GET_PRODUCTS, products })
const removeProduct = (id) => ({ type: REMOVE_PRODUCT, id });
const createProduct = product => ({ type: CREATE_PRODUCT, product })
const updateProduct = product => ({ type: UPDATE_PRODUCT, product })


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

export const updateProductThunk = (product, id) =>
    dispatch =>
        axios.put(`api/products/${id}`, product)
            .then(res => dispatch(updateProduct(res.data || defaultProduct)))
            .catch(err => console.log(err))
//test

//Reducer
export default function (state = defaultProducts, action) {
    switch (action.type) {
        case GET_PRODUCTS:
            return action.products
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
