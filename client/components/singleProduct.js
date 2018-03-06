
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Container, Divider, Header, Image, Icon, Button } from 'semantic-ui-react'
import { fetchProduct } from '../store/product.js'
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
    if (!Object.keys(product).length) {
      return <div>LOADING</div>
    }

    return (
      <div>
        <div className='single-product'>
        </div>
        <Grid centered>
          <Grid.Row>
            <Grid.Column width={4}>
              <Image src={product.imageURL} />
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
            <Reviews theProduct={product} />
            {this.props.user.id !== undefined ? <ReviewForm productId={product.id}/> : <div>Please login to leave a review</div>}
            </Grid.Column>
          </Grid.Row>


        </Grid>


      </div>
    )
  }
}

const mapState = ({ product, products, user }) => ({ product, products, user })

function mapDispatch(dispatch, ownProps){
  const id = +ownProps.match.params.id;

  return {
    loadData(){
      dispatch(fetchProduct(id));
    }
  };
}

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
