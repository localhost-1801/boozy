
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { auth } from '../store'
import {Grid, Container, Divider, Header, Card, Image, Icon } from 'semantic-ui-react'
import { fetchProducts} from '../store/products.js'

class SingleProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render () {
        let singleProduct = this.props.products.find(product => product.id === +this.props.match.params.id)
        if (singleProduct === undefined){
            return <div>LOADING</div>
        }
        return (
            <div>
            <div className='single-product'>
            </div>
            <Grid centered>
            <Grid.Column width={4}>
              <Image src='http://www.pngpix.com/wp-content/uploads/2016/10/PNGPIX-COM-Wine-Bottle-PNG-Transparent-Image.png' />
            </Grid.Column>
            <Grid.Column width={9}>
              <Container textAlign={'right'}>
                  <Divider horizontal >2014</Divider>
                  <Divider horizontal><Header as='h2'>{singleProduct.title}</Header></Divider>

                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              </Container>
            </Grid.Column>

          </Grid>
          </div>
        )
    }
}

const mapState = ({ products }) => ({ products })
const mapDispatch = null

export default connect(mapState, mapDispatch)(SingleProduct);

// examples
const GridExampleColumnWidth = () => (
    <Grid centered>
      <Grid.Column width={4}>
        <Image src='http://www.pngpix.com/wp-content/uploads/2016/10/PNGPIX-COM-Wine-Bottle-PNG-Transparent-Image.png' />
      </Grid.Column>
      <Grid.Column width={9}>
        <Container textAlign={'right'}>
            <Divider horizontal >2014</Divider>
            <Divider horizontal><Header as='h2'>Header</Header></Divider>

          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </Container>
      </Grid.Column>

    </Grid>
  )

  //hopefully this stays
