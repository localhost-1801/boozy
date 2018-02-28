import React from 'react'
import { Button, Form, Grid, Header, Message, Segment, Icon } from 'semantic-ui-react'

const Login = () => (
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
          {' '}Log-in to your account
        </Header>
        <Form size='large'>
          <Segment raised>
            <Form.Input
              icon='user'
              iconPosition='left'
              placeholder='E-mail address'
            />
            <Form.Input
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
            />
            <Button color='olive' fluid size='small'>Login</Button>
          </Segment>
        </Form>
        <Message>
          <a
            target='_self'
            href='/auth/google'>
            <Button color='google plus' fluid size='small'>
              <Icon name='google' /> Login With Google
            </Button>
          </a>
        </Message>
        <Message>
          New to us? <a href='/signup'>Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>
  </div>
)

export default Login
