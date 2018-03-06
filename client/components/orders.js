import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Header, Image, Button } from 'semantic-ui-react'
import { fetchOrders } from '../store/orders'
import { me } from '../store/user'
import { fetchCart } from '../store/cart'
import { Link } from 'react-router-dom'
import Hashids from 'hashids'
const hashids = new Hashids();


class Orders extends Component {
  constructor(props){
    super(props)
    
    this.state = {
      carts: [],
    }
  }

  //neeed to .then off of .getUser somehow
  componentDidMount(){
    this.props.getOrders(this.props.user.id);
  }

  render() {
    console.log('orders', this.props.orders)
    if(!this.props.user.id){
      return(
        <p> Must Login to see previous orders </p>
      )
    }
    return (
      <div>
        <div className='cart'>
        </div>

        <Header as='h2' color='black' textAlign='center'>
        {' '}Your Orders
        </Header>
        {this.props.orders.map( item => (
          <div key={item.id}>
            <div className="ordersTitle">
              <Table collapsing fixed color='olive' key='olive'>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell colSpan='5'>Placed order</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                {item.products.map( product => (
                  <Table.Body key={product.id}>
                    <Table.Row textAlign='center'>
                      <Table.Cell><Image id='checkoutImg' src={product.imageURL} size='medium'/></Table.Cell>
                      <Link to={`/products/${product.id}`}><Table.Cell><b>{product.title}</b></Table.Cell></Link>
                    <Table.Cell><b>Subtotal:</b> <br />${product.cartItem.purchasePrice * product.cartItem.quantity}</Table.Cell>
                      <Table.Cell><b>Status:</b> <br />{item.status}</Table.Cell>
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
  getOrders(){
    dispatch(me())
    .then( result =>{
      
      return(dispatch(fetchOrders(result.user.id)))
    })
  },
  getUser(){ dispatch(me()) },
})}

export default connect(mapState, mapDispatch)(Orders);
