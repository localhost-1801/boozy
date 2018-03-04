import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Header, Image, Button } from 'semantic-ui-react'
import { fetchOrders } from '../store/orders'
import { me } from '../store/user'


class Orders extends Component {
  constructor(props){
    super(props)

  }

  //neeed to .then off of .getUser somehow
  componentDidMount(){
    console.log(this.props)
    this.props.getUser()
    this.props.getOrders(this.props.user.id)
  }

  render() {
    if(!this.props.user.id){
      return(
        <p> Must Login to see previous orders </p>
      )
    } else {
      console.log(this.props.orders);
    return (
      <div>
        <div className='cart'>
        </div>

        <Header as='h2' color='black' textAlign='center'>
        {' '}Your Orders
    </Header>
      <div className="ordersTitle">
        <Table collapsing fixed color='olive' key='olive'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan='5'>Placed order on February 26, 2018</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row textAlign='center'>
              <Table.Cell><Image src='img/white.jpg' size='medium'/></Table.Cell>
              <Table.Cell><b>Chardonnay</b></Table.Cell>
            <Table.Cell><b>Subtotal:</b> <br />$20.00</Table.Cell>
              <Table.Cell><b>Status:</b> <br />Shipped</Table.Cell>
              <Table.Cell>
                <a
                  target='_self'
                  href='#'>
                  <Button color='olive'>Write review</Button>
                </a>
              </Table.Cell>
            </Table.Row>
          </Table.Body>

          <Table.Body>
          <Table.Row textAlign='center'>
            <Table.Cell><Image src='img/red.jpg' size='medium'/></Table.Cell>
            <Table.Cell><b>Merlot</b></Table.Cell>
          <Table.Cell><b>Subtotal:</b> <br />$10.00</Table.Cell>
            <Table.Cell><b>Status:</b> <br />Shipped</Table.Cell>
            <Table.Cell>
              <a
                target='_self'
                href='#'>
                <Button color='olive'>Write review</Button>
              </a>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
        </Table>



        <Table collapsing fixed color='olive' key='olive'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan='5'>Placed order on February 28, 2018</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row textAlign='center'>
            <Table.Cell><Image src='img/white.jpg' size='medium'/></Table.Cell>
            <Table.Cell><b>Chardonnay</b></Table.Cell>
          <Table.Cell><b>Subtotal:</b> <br />$20.00</Table.Cell>
            <Table.Cell><b>Status:</b> <br />Shipped</Table.Cell>
            <Table.Cell>
              <a
                target='_self'
                href='#'>
                <Button color='olive'>Write review</Button>
              </a>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      </div>
      </div>
    )
    }
  }
}

const mapState = ({ user, orders }) => ({ user, orders });
const mapDispatch = (dispatch) => { return ({
  getOrders(userId){ dispatch(fetchOrders(userId))},
  getUser(){ dispatch(me()) }
})}

export default connect(mapState, mapDispatch)(Orders);
