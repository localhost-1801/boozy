import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Icon, Label, Menu, Table, Button } from 'semantic-ui-react';
import { fetchUsers } from '../store/users.js';
import { deleteUserThunk } from '../store/user.js';
import { Link } from 'react-router-dom';

export class Users extends Component {
    constructor(props) {
        super(props)
    }
    
    componentWillMount() {
        this.props.loadInitialData()
    }

    handleIsAdmin = (id, event) => {
        console.log(id);
    }

    render() {

        return (
            <div className='userTablePadding'>
                <br />
                <h1> All Users Status </h1>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>UserName</Table.HeaderCell>
                            <Table.HeaderCell>Email</Table.HeaderCell>
                            <Table.HeaderCell>Admin Status</Table.HeaderCell>
                            <Table.HeaderCell>Delete User</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {
                            this.props.users.map(user => {
                                return (
                                    <Table.Row key={user.id}>
                                        <Table.Cell>{user.username}</Table.Cell>
                                        <Table.Cell>{user.email}</Table.Cell>
                                        <Table.Cell>{user.isAdmin === true ?
                                            <Icon color='green'
                                                name='checkmark'
                                                size='large' onClick={(e) => this.handleIsAdmin(user.id, e)} /> :
                                            <Icon color='red'
                                                name='cancel'
                                                size='large' />} </Table.Cell>
                                        <Table.Cell>
                                            <Button color='red' onClick={() => deleteUserThunk(user.id)}>DELETE USER</Button>
                                        </Table.Cell>
                                    </Table.Row>
                                )
                            })
                        }
                    </Table.Body>

                </Table>
            </div>
        )
    }
}

const mapState = ({ users }) => ({ users })

const mapDispatch = (dispatch) => {
    return {
        loadInitialData() {
            dispatch(fetchUsers())
        },
        
    }
}

export default connect(mapState, mapDispatch)(Users);