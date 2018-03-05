
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { auth } from '../store'
import { Grid, Container, Divider, Header, Card, Image, Icon, Item, Button } from 'semantic-ui-react'
import { fetchProducts } from '../store/products.js'
import  Reviews  from './reviews'
import ReviewForm from './reviewForm'

class SingleProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount(){
    this.props.loadData()
  }

  render() {
    const { product } = this.props;
    const { isAdmin } = this.props.user;

    if (product  === undefined) {
      return <div>LOADING</div>
    }

    return (
      <div>
        <div className='single-product'>
        </div>
        <Grid centered>
          <Grid.Row>
            <Grid.Column width={4}>
              <Image src='http://www.pngpix.com/wp-content/uploads/2016/10/PNGPIX-COM-Wine-Bottle-PNG-Transparent-Image.png' />
            </Grid.Column>
            <Grid.Column width={9}>
              <Container textAlign={'right'}>
                <Divider horizontal>{product.year}</Divider>
                <Divider horizontal><Header as='h2'>{product.title}</Header></Divider>
                <p className='centered-text'>{product.description}</p>
                <p className='centered-text'>${product.price}</p>
                <Grid centered columns={1}>
                <Grid.Row>
                <Button><Icon name="plus cart" /> Add to Cart</Button>
                {isAdmin && (
                <Button href={`/products/update/${product.id}`}>Edit Item</Button>
                )}
                </Grid.Row>
                </Grid>
              </Container>
            </Grid.Column>
          </Grid.Row>
          <Divider horizontal> Reviews</Divider>
          <Grid.Row centered={false}>
            <Grid.Column width={13}>
            <Reviews theProduct={singleProduct} />
            {this.props.user.id !== undefined ? <ReviewForm productId={singleProduct.id}/> : <div>Please login to leave a review</div>}
            </Grid.Column>
          </Grid.Row>
          

        </Grid>
        

      </div>
    )
  }
}

<<<<<<< HEAD
const mapState = ({ products, user, reviews }) => ({ products, user, reviews})
const mapDispatch = null
=======
const mapState = ({ product, products, user }) => ({ product, products, user })

function mapDispatch(dispatch, ownProps){
  const id = +ownProps.match.params.id;
  const history = ownProps.history

  return {
    loadData(){
      console.log('id: ', id)
      dispatch(fetchProduct(id));
    }
  };
}
>>>>>>> master

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
