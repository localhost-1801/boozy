
import React, { Component } from 'react'
import { Grid, Container, Divider, Header, Card, Image, Icon, Dropdown, Button } from 'semantic-ui-react'
import { fetchProducts } from '../store/products.js'

export default class SingleProduct extends Component {
  render() {
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
        </Grid>
      </div>
    )
  }
}


