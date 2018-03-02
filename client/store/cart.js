import axios from 'axios'


const ADD = 'ADD_TO_CART'


const add = (productToAdd) => ({type: ADD, productToAdd})

export const addProductToCart = (productToAdd) =>
  dispatch =>
    axios.put('/api/cart', productToAdd )
      .then(res =>{
        return (
          dispatch(add(res.data))
        )
      })
    .catch(err => console.error(err));


export default function (state = {}, action) {
  switch (action.type) {
    case ADD:
      return action.add
    default:
      return state
  }
}
