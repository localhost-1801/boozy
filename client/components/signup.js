import React from 'react'
import { connect } from 'react-redux'
import { signup as signUpFromReducer } from '../store/user'
import { Button, Form, Grid, Header, Message, Segment, Icon } from 'semantic-ui-react'

class Signup extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    const { onSignUpSubmit } = this.props
     return(
      <div className='login-form'>
        {/*
          Heads up! The styles below are necessary for the correct render of this example.
          You can do same with CSS, the main idea is that all the elements up to the `Grid`
          below must have a height of 100%.
        */}
        <style>{`
          body > div,
          body > div > div,
          body > div > div > div.login-form {
            height: 100%;
          }
        `}</style>
        <Grid
          textAlign='center'
          style={{ height: '100%' }}
          verticalAlign='middle'
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='olive' textAlign='center'>
              {' '}Create a Boozy account and start shopping
            </Header>
            <Form onSubmit={evt => onSignUpSubmit(evt)} size='large'>
              <Segment raised>
                <Form.Input
                name='username'
                icon='user'
                iconPosition='left'
                placeholder='Username'
              />
                <Form.Input
                  name='email'
                  icon='mail'
                  iconPosition='left'
                  placeholder='E-mail address'
                />
                <Form.Input
                  name='password'
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                />
                <Button type='submit' color='olive' fluid size='small'>Sign Up</Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    )}
}

const mapState = null;
const mapDispatch = (dispatch, ownProps) => ({
  onSignUpSubmit(event){
    event.preventDefault();
    dispatch (signUpFromReducer({
      username: event.target.username.value,
      email: event.target.email.value,
      password: event.target.password.value
    }))
  }
})

export default connect(mapState, mapDispatch)(Signup);
