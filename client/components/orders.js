import React, { Component } from 'react'
import { Table, Header, Image, Button } from 'semantic-ui-react'


export default class Orders extends Component {
  render() {
    return (
      <div>
        <div className='cart'>
        </div>

        <Header as='h2' color='black' textAlign='center'>
        {' '}Your Orders
    </Header>

      <div className="ordersTitle">
        <Table collapsing fixed color='olive' key='olive'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan='5'>Placed order on February 26, 2018</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row textAlign='center'>
              <Table.Cell><Image src='img/white.jpg' size='medium'/></Table.Cell>
              <Table.Cell><b>Chardonnay</b></Table.Cell>
            <Table.Cell><b>Subtotal:</b> <br />$20.00</Table.Cell>
              <Table.Cell><b>Status:</b> <br />Shipped</Table.Cell>
              <Table.Cell>
                <a
                  target='_self'
                  href='#'>
                  <Button color='olive'>Write review</Button>
                </a>
              </Table.Cell>
            </Table.Row>
          </Table.Body>

          <Table.Body>
          <Table.Row textAlign='center'>
            <Table.Cell><Image src='img/red.jpg' size='medium'/></Table.Cell>
            <Table.Cell><b>Merlot</b></Table.Cell>
          <Table.Cell><b>Subtotal:</b> <br />$10.00</Table.Cell>
            <Table.Cell><b>Status:</b> <br />Shipped</Table.Cell>
            <Table.Cell>
              <a
                target='_self'
                href='#'>
                <Button color='olive'>Write review</Button>
              </a>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
        </Table>



        <Table collapsing fixed color='olive' key='olive'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan='5'>Placed order on February 28, 2018</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row textAlign='center'>
            <Table.Cell><Image src='img/white.jpg' size='medium'/></Table.Cell>
            <Table.Cell><b>Chardonnay</b></Table.Cell>
          <Table.Cell><b>Subtotal:</b> <br />$20.00</Table.Cell>
            <Table.Cell><b>Status:</b> <br />Shipped</Table.Cell>
            <Table.Cell>
              <a
                target='_self'
                href='#'>
                <Button color='olive'>Write review</Button>
              </a>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      </div>
      </div>
    )
  }
}


// <Grid columns={4}>
// <Grid.Row>
//   <Grid.Column>
//     Purchased on <b>February 28, 2018</b>
//   </Grid.Column>
// </Grid.Row>

// <Grid.Row>
//   <Grid.Column>
//     <Image src='img/white.jpg' />
//   </Grid.Column>
//   <Grid.Column>
//     Wine Name
//   </Grid.Column>
//   <Grid.Column>
//     Subtotal
//   </Grid.Column>
// </Grid.Row>
// </Grid>


