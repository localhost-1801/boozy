
import React, { Component } from 'react'
import { Grid, Header, Image, Dropdown, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { fetchCart } from '../store/cart'

class Cart extends Component {
  constructor(props){
    super(props)


  }

  componentDidMount(){
    this.props.setCart('' + document.cookie.slice(5))
    console.log(this.props.cart)
  }

  render() {
    console.log(this.props.cart)
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
              <Grid.Row>
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
                  <Dropdown text='Quantity'>
                    <Dropdown.Menu>
                      <Dropdown.Item text='1' />
                      <Dropdown.Item text='2' />
                      <Dropdown.Item text='3' />
                      <Dropdown.Item text='4' />
                      <Dropdown.Item text='5' />
                    </Dropdown.Menu>
                  </Dropdown>
                </Grid.Column>
              </Grid.Row>
            )
          })}
          <Grid.Row>
            <Grid.Column width={3}>
              <Image src='img/white.jpg' />
            </Grid.Column>
            <Grid.Column width={6}>
              Merlot
              <br />
              <br />
              <Button basic color='red' content='Delete' />
            </Grid.Column>
            <Grid.Column width={3}>
              $20.00
        </Grid.Column>
            <Grid.Column width={3}>
              <Dropdown text='Quantity'>
                <Dropdown.Menu>
                  <Dropdown.Item text='1' />
                  <Dropdown.Item text='2' />
                  <Dropdown.Item text='3' />
                  <Dropdown.Item text='4' />
                  <Dropdown.Item text='5' />
                </Dropdown.Menu>
              </Dropdown>
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
              <a
                target='_self'
                href='/checkout'>
                <Button color='green'>Proceed to checkout</Button>
              </a>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

const mapState = ({ cart }) => ({ cart });
const mapDispatch = (dispatch) => ({ setCart(cookie){
  dispatch(fetchCart(cookie))
}});

export default connect(mapState, mapDispatch)(Cart);
