import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Icon, Label, Menu, Table, Button } from 'semantic-ui-react';
import { fetchUsers } from '../store/users.js';
import { deleteUserThunk, updateToAdminThunk } from '../store/user.js';
import { Link } from 'react-router-dom';

export class Users extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        this.props.loadInitialData()
    }

    render() {

        const rows = this.props.users.map(user => {
            return (
                <Table.Row key={user.id}>
                    <Table.Cell>{user.username}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>{user.isAdmin === true ?
                        <Icon color='green'
                            name='checkmark'
                            size='large' onClick={this.props.updateToAdminThunk(user.id, { bool: !user.isAdmin })} /> :
                        <Icon color='red'
                            name='cancel'
                            size='large' onClick={this.props.updateToAdminThunk(user.id, { bool: !user.isAdmin })} />}
                    </Table.Cell>
                    <Table.Cell>
                        <Button color='red' onClick={this.props.deleteUserThunk(user.id)}>DELETE USER</Button>
                    </Table.Cell>
                </Table.Row>
            )
        })

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
                        {rows}
                    </Table.Body>

                </Table>
            </div>
        )
    }
}

const mapState = ({ users }) => ({ users })

const mapDispatch = (dispatch) => {
    return {
        loadInitialData: () => dispatch(fetchUsers()),
        deleteUserThunk: (id) => deleteUserThunk(id), //not sure if dispatch should be here
        updateToAdminThunk: (id, user) => updateToAdminThunk(id, user) //not sure if dispatch should be here

    }
}

export default connect(mapState, mapDispatch)(Users);