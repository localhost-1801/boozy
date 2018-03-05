import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Icon, Label, Menu, Table } from 'semantic-ui-react';
import { fetchUsers } from '../store/users.js';
import { Link } from 'react-router-dom';

export class Users extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentWillMount() {
        this.props.loadInitialData()
    }

    handleClick = (event) => {
        console.log(event);
    }


    //handleClick to change users to admins

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
                            <Table.HeaderCell>isAdmin</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {
                            this.props.users.map(user => {
                                return (
                                    <Table.Row key={user.id}>
                                        <Table.Cell>{user.username}</Table.Cell>
                                        <Table.Cell>{user.email}</Table.Cell>
                                        <Table.Cell>{user.isAdmin === true? 
                                            <Icon color='green' 
                                            name='checkmark' 
                                            size='large' onClick={this.handleClick}/>  : '' } </Table.Cell>
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
        }
    }
}

export default connect(mapState, mapDispatch)(Users);