import axios from 'axios';

//ACTION TYPES

const GET_ORDERS = 'GET_ORDERS';
const GET_ORDER = 'GET_ORDER';
const CREATE_ORDER = 'CREATE_ORDER';
//INITIAL STATE

const defaultOrders = [];

//ACTION CREATORS

const getOrders = orders => ({ type: GET_ORDERS, orders })
const getOrder = order => ({ type: GET_ORDER, order })
const createOrder = order => ({ type: CREATE_ORDER, order })


//THUNK CREATORS

export const fetchOrders = (userId) =>
    dispatch =>
        axios.get(`/api/orders/${userId}`)
            .then(res => {
                return (
                    dispatch(getOrders(res.data || defaultOrders))
                )
            })
            .catch(err => console.log(err));

export const fetchOrder = (userId, id) =>
    dispatch =>
        axios.get(`/api/orders/single/${userId}/${id}`)
            .then(res => {
                return (
                    dispatch(getOrder(res.data || defaultOrders))
                )
            })
            .catch(err => console.log(err));

export const createNewOrder = (order) =>
    dispatch =>
        axios.post('/api/orders', order)
            .then(res => {
                return (
                    dispatch(createOrder(res.data || defaultOrders))
                )
            })
            .catch(err => console.log(err));
//REDUCERS

export default function (state = defaultOrders, action) {
    switch (action.type) {
        case GET_ORDERS:
            return action.orders
        case GET_ORDER:
            return action.order
        case CREATE_ORDER:
            return [action.order, ...state];
        default:
            return state
    }
}
