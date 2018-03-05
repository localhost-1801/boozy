import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const SET_CURRENT_USER = 'SET_CURRENT_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const setCurrentUser = user => ({ type: SET_CURRENT_USER, user})

/**
 * THUNK CREATORS
 */

export const signup = (credentials) => dispatch => {
  axios.post('/auth/signup', credentials)
    .then(res => {
      return(setUserAndRedirect(res.data, history, dispatch))
    })
    .catch(err => console.error(`Logging in with ${credentials.email} and ${credentials.password} was unsuccesful`, err));
  };

 export const login = (credentials) => dispatch => {
 axios.post('/auth/login', credentials)
   .then(res => {
     return(setUserAndRedirect(res.data, history, dispatch))
   })
   .catch(err => console.error(`Logging in with ${credentials.email} and ${credentials.password} was unsuccesful`, err));
 };

export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then(res =>
        dispatch(getUser(res.data || defaultUser)))
      .catch(err => console.log(err))

export const auth = (email, password, method) =>
  dispatch =>
    axios.post(`/auth/${method}`, { email, password })
      .then(res => {
        dispatch(getUser(res.data))
        history.push('/home')
      }, authError => { // rare example: a good use case for parallel (non-catch) error handler
        dispatch(getUser({error: authError}))
      })
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(_ => {
        dispatch(removeUser())
        history.push('/login')
      })
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return action.user
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}

function setUserAndRedirect (user, history, dispatch) {
  dispatch(setCurrentUser(user));
  history.push('/')
}


//test