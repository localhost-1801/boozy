import axios from 'axios'

//ACTION TYPES

const GET_PROD_BY_CAT = 'GET_PROD_BY_CAT'


//INITIAL STATE

const defaultProducts = []

//Action creators

const getProducts = products => ({type: GET_PROD_BY_CAT, products})


//Thunk creators
export const fetchProducts = () =>
    dispatch =>
        axios.get('/api/products')
            .then(res =>
                {
                    return (
                        dispatch(getProducts(res.data || defaultProducts))
                    )
                })
            .catch(err => console.error(err))


//Reducer
export default function (state = defaultProducts, action) {
    switch (action.type) {
      case GET_PROD_BY_CAT:
        return action.products
      default:
        return state
    }
  }

  //test
