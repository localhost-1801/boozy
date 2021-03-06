
import React, { Component } from 'react'
import { Grid, Header, Image, Dropdown, Button, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { fetchCart, addProductToCart, removeProductFromCart } from '../store/cart'
import { createNewOrder } from '../store/orders'
import { Link } from 'react-router-dom';
import Hashids from 'hashids'
const hashids = new Hashids();

class Cart extends Component {
  constructor(props){
    super(props)

    this.state = {
      cCNumber: '',
      eMail: '',
      address: '',
    }
    this.updateFormState = this.updateFormState.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.generateDropdown = this.generateDropdown.bind(this);
    this.checkout = this.checkout.bind(this);
  }

  componentDidMount(){
    this.props.setCart('' + document.cookie.slice(5))
  }

  //need to somehow .then off of updateCart and call this.props.setCart
  handleQuantityChange(newQuantity, productId){
    let cartDetails = {
      productId,
      quantity: {
        add: false,
        value: newQuantity
      }
    }
    this.props.updateCart(cartDetails)
  }

  handleDelete = (productId) => {
    const cartId = hashids.decode(document.cookie.slice(document.cookie.indexOf('=') + 1))[0]
    const payload = {
      productId: productId,
      cartId: cartId

    }
    this.props.removeProduct(payload);
  }

  generateDropdown(item){
    let dropDowns = [];
    for (var i = 1; i < item.cartItem.quantity + 4; i++){
      let iCopy = i;
      dropDowns.push(
        <Dropdown.Item text={i} key={i} onClick={() => this.handleQuantityChange(iCopy, item.cartItem.productId)} />
      )
    }
    return dropDowns;
  }

  updateFormState(event){
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  checkout(){
      let orderDetail = {
        // email: this.state.email,
        cartId: hashids.decode(document.cookie.slice(document.cookie.indexOf('=') + 1))[0],
        address: this.state.address,
        status: 'processing',
        userId: this.props.user.id ? this.props.user.id : null,
      }
    document.cookie = 'cart=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    this.props.createOrder(orderDetail);
  }

  render() {


      if (!this.props.cart.id){

      return (
        <div>
          Loading...
        </div>
      )
    }
    return (
      <div>
        <div className="cart-background">
        </div>
        <div style={{paddingLeft: '2em', paddingRight: '2em'}}>
        <Header as='h2' color='black' textAlign='center'>
        {' '}Shopping Cart
      </Header>
        <Grid divided="vertically">
        <Grid.Row>
            <Grid.Column width={3}>
            </Grid.Column>
            <Grid.Column width={5} className="cartHeader">
              Product(s)
            </Grid.Column>
            <Grid.Column width={2} className="cartHeader">
              Price
        </Grid.Column>
            <Grid.Column width={2} className="cartHeader">
              Quantity
            </Grid.Column>
            <Grid.Column width={2} className="cartHeader">
              Total
            </Grid.Column>
          </Grid.Row>
          {this.props.cart.products.sort((a, b)=> a.title > b.title).map( item => {
            return (
              <Grid.Row key={item.id}>
                <Grid.Column width={3}>
                  <Image size='tiny' src={item.imageURL} />
                </Grid.Column>
                <Grid.Column width={5}>
                  {item.title}
                  <br />
                  <br />
                  <Button basic color="red" onClick={() => this.handleDelete(item.id)} content="Delete" />
                </Grid.Column>
                <Grid.Column width={2}>
                  ${item.price}
            </Grid.Column>
                <Grid.Column width={2}>
                  <Dropdown text={'' + item.cartItem.quantity}>
                    <Dropdown.Menu >
                      {this.generateDropdown(item)}
                    </Dropdown.Menu>
                  </Dropdown>
                </Grid.Column>
                <Grid.Column width={2}>
                  ${item.price * item.cartItem.quantity}
            </Grid.Column>
              </Grid.Row>
            )
          })}
          <Grid.Row>
            <Grid.Column width={15}>
              <Form>
                <Form.Group>
                <Form.Field>
                  <label>E-Mail</label>
                  <input name="eMail" onChange={this.updateFormState} placeholder="E-Mail" />
                </Form.Field>
                <Form.Field>
                  <label>Credit Card Number</label>
                  <input name="cCNumber" onChange={this.updateFormState} placeholder="Credit Card Number" />
                </Form.Field>
                <Form.Field>
                  <label>Address</label>
                  <input name="address" onChange={this.updateFormState} placeholder="Address" />
                </Form.Field>
                </Form.Group>
              </Form>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={3}>
            </Grid.Column>
            <Grid.Column width={6}>
            </Grid.Column>
            <Grid.Column width={3}>
            </Grid.Column>
            <Grid.Column width={3}>
                <Link to="/orders">
                  <Button onClick={this.checkout} color="green">Place Order</Button>
                </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        </div>
      </div>
    )
  }
  }


const mapState = ({ cart, user }) => ({ cart, user });
const mapDispatch = (dispatch) => { return ({
  setCart(cookie){ dispatch(fetchCart(cookie))},
  updateCart(product){ dispatch(addProductToCart(product))},
  createOrder(order){ dispatch(createNewOrder(order)) },
  removeProduct(productId){ dispatch(removeProductFromCart(productId))}
})}

export default connect(mapState, mapDispatch)(Cart);
