import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Icon, Label, Header, Menu, Table, Button } from 'semantic-ui-react';
import { fetchUsers, deleteUserThunk, updateToAdminThunk, updateUserPassword, triggerPassChangeThunk } from '../store/users.js';
import { Link } from 'react-router-dom';

class Users extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        this.props.loadInitialData()
    }

    render() {
        let users = this.props.users
        return (
            <div className='userTablePadding productsBackground'>
                <br />
                <h2 className = "adminUsersHeader">
                {' '} Admin - Review All Users
              </h2>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>UserName</Table.HeaderCell>
                            <Table.HeaderCell>Email</Table.HeaderCell>
                            <Table.HeaderCell>Admin Status</Table.HeaderCell>
                            <Table.HeaderCell> Trigger Password Reset</Table.HeaderCell>
                            <Table.HeaderCell>Delete User</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {
                            users.map(user => {
                                return (
                                    <Table.Row key={user.id}>
                                        <Table.Cell>{user.username}</Table.Cell>
                                        <Table.Cell>{user.email}</Table.Cell>
                                        <Table.Cell>
                                            <Button onClick={() => this.props.updateToAdmin(user.id, { bool: !user.isAdmin })}>
                                                {user.isAdmin === true ?
                                                    <Icon color='green'
                                                        name='checkmark'
                                                        size='large' /> :
                                                    <Icon color='red'
                                                        name='cancel'
                                                        size='large'
                                                    />}
                                            </Button>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Button color='blue' onClick={() => this.props.resetPass(user.id, {flag: true})}>Reset Password</Button>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Button color='red' onClick={() => this.props.deleteUser(user.id)}>DELETE USER</Button>
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

const mapStateToProps = ({ users }) => ({ users })

const mapDispatchToProps = (dispatch) => {
    return {
        loadInitialData() {
            dispatch(fetchUsers())
        },
        deleteUser(id) {
            dispatch(deleteUserThunk(id))
        },
        updateToAdmin(id, user) {
            dispatch(updateToAdminThunk(id, user))
        },
        resetPass(id, user) {
            dispatch(triggerPassChange(id, user))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);
