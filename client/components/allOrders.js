import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Header, Image, Button, Dropdown } from 'semantic-ui-react'
import { fetchOrders } from '../store/orders'
import { me } from '../store/user'
import { fetchCart } from '../store/cart'
import { fetchAllOrders } from '../store/orders'
import { Link } from 'react-router-dom'
import Hashids from 'hashids'
const hashids = new Hashids();


class allOrders extends Component {
  constructor(props){
    super(props)

    this.state = {
      activeItem: '',
      filterBy: '',
    }
  }

  //neeed to .then off of .getUser somehow
  componentDidMount(){
    this.props.getOrders();
  }

  render() {
    console.log('prop', this.props)
    if(!this.props.orders.length === 0){
      return (
        <p>Loading...</p>
      )
    }
    return (
      <div>
        <div className='cart'>
        </div>

        <Header as='h2' color='black' textAlign='center'>
        {' '}All Orders
        </Header>
        {this.props.orders.map( item => (
          <div key={item.id}>
            <div className="ordersTitle">
              <Table collapsing fixed color='olive' key='olive'>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell colSpan='5'>Order ID# {item.id}</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                {item.products.map( product => (
                  <Table.Body key={product.id}>
                    <Table.Row textAlign='center'>
                      <Table.Cell><Image id='checkoutImg' src={product.imageURL} size='medium'/></Table.Cell>
                      <Link to={`/products/${product.id}`}><Table.Cell><b>{product.title}</b></Table.Cell></Link>
                    <Table.Cell><b>Subtotal:</b> <br />${product.cartItem.purchasePrice * product.cartItem.quantity}</Table.Cell>
                      <Table.Cell><b>Status:</b> <br /></Table.Cell>
                        <Dropdown text={'' + item.status}>
                          <Dropdown.Menu >
                          </Dropdown.Menu>
                        </Dropdown>
                    </Table.Row>
                  </Table.Body>
                ))}
              </Table>
              </div>
            </div>
        ))}
        </div>
    )
  }
}

const mapState = ({ user, orders }) => ({ user, orders });
const mapDispatch = (dispatch) => { return ({
  updateCart(id){
    dispatch(me())
    .then( result =>{
      return(dispatch(fetchOrders(result.user.id)))
    })
  },
  getOrders(){ dispatch(fetchAllOrders()) },
})}

export default connect(mapState, mapDispatch)(allOrders);
