import React from 'react'
import { connect } from 'react-redux'
import { Form, Button, Header, Grid, Segment } from 'semantic-ui-react'
import { addProduct } from '../store/products'

const options = [
  { key: 1, text: 'Red', value: 'red' },
  { key: 2, text: 'White', value: 'white' },
]

class New extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    const { onNewItemSubmit } = this.props
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
            <Header as="h2" color="black" textAlign="center">Create New Product
          </Header>
            <Form size="large" onSubmit={event => onNewItemSubmit(event)}>
              <Segment raised>
                <Form.Input
                  label="Item Name"
                  placeholder="Item Name"
                  name="title"
                />
                <Form.Input
                  label="Price"
                  placeholder="Price"
                  name="price"
                />
                <Form.Input
                  label="Year"
                  placeholder="Year"
                  name="year"

                />
                <Form.Input
                  label="Inventory"
                  placeholder="Inventory"
                  name="inventory"
                />
                <Form.Input
                  label="Picture URL"
                  placeholder="Picture URL"
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
                  placeholder="Description"
                  name="description"
                />
                <br />
                <Form.Input
                label="Availability"
                placeholder="Available or Unavailable"
                name="availability"
              />
                <br />
                <Button type="submit" fluid size="large">Create Product</Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

const mapState = null;
const mapDispatch = (dispatch, ownProps) => ({
  onNewItemSubmit(event) {
    event.preventDefault();
    dispatch(addProduct({
      title: event.target.title.value,
      description: event.target.description.value,
      year: event.target.year.value,
      price: event.target.price.value,
      inventory: event.target.inventory.value,
      imageURL: event.target.imageURL.value,
      availability: event.target.availability.value.toLowerCase()
      //need to figure out how to add in categories, new categories, and availability
    }))
  }
})

export default connect(mapState, mapDispatch)(New);
