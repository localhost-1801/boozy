import axios from 'axios'

//ACTION TYPES

const GET_USERS = 'GET_USERS';
const DELETE_USER = 'DELETE_USER'
const UPDATE_TO_ADMIN_USER = 'UPDATE_TO_ADMIN_USER'
const TRIGGER_PASS_CHANGE = 'TRIGGER_PASS_CHANGE'




//INITIAL users

const defaultUsers = [];

//Action creators

const getUsers = users => ({ type: GET_USERS, users });
const deleteUser = id => ({ type: DELETE_USER, id })
const updateToAdmin = user => ({ type: UPDATE_TO_ADMIN_USER, user })
const triggerPassChange = user => ({ type: TRIGGER_PASS_CHANGE, user })

//Thunk creators

export const triggerPassChangeThunk = (id, user) => dispatch => {
    axios.put(`/api/users/AdminForcePassChange/${id}`, user)
        .then(res => dispatch(triggerPassChange(res.data)))
        .catch(err => console.error(err))
}

export const fetchUsers = () => dispatch => {
    axios.get('/api/users/allUsersStatuses')
        .then(res => dispatch(getUsers(res.data)))
        .catch(err => console.error(err))
}

export const deleteUserThunk = id => dispatch => {
    axios.delete(`/api/users/${id}`)
        .then(() => dispatch(deleteUser(id)))
        .catch(err => console.error(err))
}

export const updateToAdminThunk = (id, user) => dispatch => {
    axios.put(`/api/users/adminStatus/${id}`, user)
        .then(res => dispatch(updateToAdmin(res.data)))
        .catch(err => console.error(err))
}

// export const updateUserPassword = (id, user) => dispatch => {
//     axios.put(`/api/users/passwordReset/${id}`, user) //where does user come from?
//         .then(res => dispatch(updateUserPass(res.data)))
//         .catch(err => console.error(err))
// }


export default function (users = defaultUsers, action) {
    switch (action.type) {
        case GET_USERS:
            return action.users;
        case DELETE_USER:
            return users.filter(user => user.id !== action.id)
        case UPDATE_TO_ADMIN_USER:
            return users.map(user => action.user.id === user.id ? action.user : user)
        case TRIGGER_PASS_CHANGE:
            return users.map(user => action.user.id === user.id ? action.user : user)
        default:
            return users;
    }
}
