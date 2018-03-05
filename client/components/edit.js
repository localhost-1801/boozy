import React from 'react'
import { connect } from 'react-redux'
import { Form, Button, Header, Grid, Segment } from 'semantic-ui-react'
import { updateProduct } from '../store/products'
import { updateProductThunk, fetchProduct } from '../store/product'
import history from '../history'

const options = [
  { key: 1, text: 'Red', value: 'red' },
  { key: 2, text: 'White', value: 'white' },
]

class Edit extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.loadData()
  }

  render() {
    const { onEditItemSubmit, product } = this.props
    return (
      <div className="productsBackground">
        <style>{`
          body > div,
          body > div > div,
          body > div > div > div.login-form {
            height: 100%;
          }
        `}</style>

        <Grid
          textAlign="center"
          style={{ height: '100%' }}
          verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 450 }}>
            <br />
            <Header as="h2" color="black" textAlign="center">Edit Product
          </Header>
            <Form size="large" onSubmit={(event, product) => onEditItemSubmit(event, product)}>
              <Segment raised>
                <Form.Input
                  label="Item Name"
                  placeholder={product.title}
                  defaultValue={product.title}
                  name="title"
                />
                <Form.Input
                  label="Price"
                  placeholder={product.price}
                  name="price"
                />
                <Form.Input
                  label="Year"
                  placeholder={product.year}
                  name="year"
                />
                <Form.Input
                  label="Inventory"
                  placeholder={product.inventory}
                  name="inventory"
                />
                <Form.Input
                  label="Picture URL"
                  placeholder={product.imageURL}
                  name="imageURL"
                />
                <br />
                <Form.Select
                  label="Categories"
                  options={options}
                  placeholder="Categories"
                  name="categories"
                />
                <br />
                <Form.TextArea
                  label="Description"
                  placeholder={product.description}
                  name="description"
                />
                <br />
                <Form.Input
                  label="Availability"
                  placeholder={product.availability}
                  name="availability"
                />
                <br />
                <Button type="submit" fluid size="large">Edit Product</Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

const mapState = ({ products, product }) => ({ products, product })

function mapDispatch(dispatch, ownProps){
  const id = +ownProps.match.params.id


  return {
    loadData() {
      dispatch(fetchProduct(id))
    },

    onEditItemSubmit(event, product) {
      event.preventDefault();
      dispatch(updateProduct(id, {
        title: event.target.title.value || product.title,
        description: event.target.description.value || product.description,
        year: event.target.year.value || product.year,
        price: event.target.price.value || product.price,
        inventory: event.target.inventory.value || product.inventory,
        imageURL: event.target.imageURL.value || product.imageURL,
        availability: event.target.availability.value.toLowerCase() || product.availability
        //need to figure out how to add in categories, new categories, and availability
      }))
      history.push(`/products/${id}`)
    }
  }}

  export default connect(mapState, mapDispatch)(Edit);
