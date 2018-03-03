import React from 'react'
import { Form, Button, Header, Grid, Segment } from 'semantic-ui-react'

const options = [
  { key: 1, text: 'Red', value: 'red' },
  { key: 2, text: 'White', value: 'white' },
]

const New = () => (
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
    verticalAlign="middle"
  >
    <Grid.Column style={{ maxWidth: 450 }}>
    <Header as="h2" color="black" textAlign="center">{' '}Create New Product
    </Header>
      <Form size="large">
        <Segment raised>
          <Form.Input
            label="Item Name"
            placeholder="Item Name"
          />
          <Form.Input
            label="Year"
            placeholder="Year"
          />
          <Form.Input
            label="Picture URL"
            placeholder="Picture URL"
          />
          <br />
          <Form.Select label="Categories" options={options} placeholder="Categories" />
          <Form.TextArea
          fluid
          label="Description"
          placeholder="Description"
          />
          <Button type="submit" fluid size="large">Create Product</Button>
        </Segment>
      </Form>
    </Grid.Column>
  </Grid>
</div>
)

export default New;
