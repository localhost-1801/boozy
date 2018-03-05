import axios from 'axios'

//ACTION TYPES

const GET_USERS = 'GET_USERS';

//INITIAL STATE

const defaultUsers = [];

//Action creators

const getUsers = users => ({ type: GET_USERS, users });

//Thunk creators

export const fetchUsers = () => dispatch => {
        axios.get('/api/users/allUsersStatuses')
            .then(res => dispatch(getUsers(res.data)))
            .catch(err => console.log(err))
}

export default function (state = defaultUsers, action) {
    switch (action.type) {
        case GET_USERS:
            return action.users;
        default:
            return state;
    }
}