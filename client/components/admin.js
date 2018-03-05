import React from 'react'
import { connect } from 'react-redux'
import { Button, Form, Link, Grid, Header, Message, Segment, Icon } from 'semantic-ui-react'
import AdminProducts from './adminProducts'
import AllUsers from './allusers'

class Admin extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
     return(
      <div className='login-form'>
        <style>{`
          body > div,
          body > div > div,
          body > div > div > div.login-form {
            height: 100%;
          }
        `}</style>
            <Header as='h2' color='olive' textAlign='center'>
              {' '}Admin Homepage
            </Header>
              <Segment raised>
                <Button href={`/allProducts`} color='olive' fluid size='small'>Review All Products</Button>
                <br />
                <Button href={`/allUsers`} color='olive' fluid size='small'>Review All Users</Button>
              </Segment>
      </div>
    )}
}

const mapState = null;
const mapDispatch = null;

export default connect(mapState, mapDispatch)(Admin);
