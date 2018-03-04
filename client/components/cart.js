
import React, { Component } from 'react'
import { Grid, Header, Image, Dropdown, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { fetchCart, addProductToCart } from '../store/cart'

class Cart extends Component {
  constructor(props){
    super(props)

    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.generateDropdown = this.generateDropdown.bind(this);
  }

  componentDidMount(){
    console.log(this.props.cart)
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

  generateDropdown(item){
    let dropDowns = [];
    for(var i = 1; i < item.cartItem.quantity + 4; i++){
      let iCopy = i;
      dropDowns.push(
        <Dropdown.Item text={i} key={i} onClick={() => this.handleQuantityChange(iCopy, item.cartItem.productId)} />
      )
    }
    return dropDowns;
  }

  render() {
    if(this.props.cart.length === 0){
      return(
        <div>
          Loading..
        </div>
      )
    } else {
    return (
      <div>
        <div className='cart'>
        </div>
        <Header as='h2' color='black' textAlign='center'>
        {' '}Shopping Cart
      </Header>
        <Grid divided='vertically'>
        <Grid.Row>
            <Grid.Column width={3}>
            </Grid.Column>
            <Grid.Column width={6} className="cartHeader">
              Product(s)
            </Grid.Column>
            <Grid.Column width={3} className="cartHeader">
              Price
        </Grid.Column>
            <Grid.Column width={3} className="cartHeader">
              Quantity
            </Grid.Column>
          </Grid.Row>
          {this.props.cart.products.map( item => {
            return(
              <Grid.Row key={item.id}>
                <Grid.Column width={3}>
                  <Image src={item.imageURL} />
                </Grid.Column>
                <Grid.Column width={6}>
                  {item.title}
                  <br />
                  <br />
                  <Button basic color='red' content='Delete' />
                </Grid.Column>
                <Grid.Column width={3}>
                  {item.price}
            </Grid.Column>
                <Grid.Column width={3}>
                  <Dropdown text={'' + item.cartItem.quantity}>
                    <Dropdown.Menu >
                      {this.generateDropdown(item)}
                    </Dropdown.Menu>
                  </Dropdown>
                </Grid.Column>
              </Grid.Row>
            )
          })}

          <Grid.Row>
            <Grid.Column width={3}>
            </Grid.Column>
            <Grid.Column width={6}>
            </Grid.Column>
            <Grid.Column width={3}>
            </Grid.Column>
            <Grid.Column width={3}>
              <a
                target='_self'
                href='/checkout'>
                <Button type='submit' color='green'>Proceed to checkout</Button>
              </a>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
  }
}

const mapState = ({ cart }) => ({ cart });
const mapDispatch = (dispatch) => { return ({
  setCart(cookie){ dispatch(fetchCart(cookie))},
  updateCart(product){ dispatch(addProductToCart(product))}
})}

export default connect(mapState, mapDispatch)(Cart);
