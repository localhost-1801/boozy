import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Button, Form, Grid, Header, Message, Segment, Icon } from 'semantic-ui-react'
import { passwordReset } from '../store/user'
import history from '../history'

class Home extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const styles = {
      zIndex: 150,
      backgroundColor: `black`,
      textAlign: 'center',
      position: 'fixed',
      padding: 0,
      margin: 0,
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      opacity: 0.9
    }
    return (
      <div className="indexBackgroundZIndex" style={styles}>

        <div className='login-form'>
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
                {' '}An Admin has asked that you reset your Password. Please reset to continue.
            </Header>
              <Form onSubmit={evt => this.props.onPasswordSubmit(evt)} size='large'>
                <Segment raised>
                  <Form.Input
                    name='email'
                    icon='mail'
                    iconPosition='left'
                    placeholder='E-mail address'
                  />
                  <Form.Input
                    name='currentPassword'
                    icon='lock'
                    iconPosition='left'
                    placeholder='Current Password'
                    type='password'
                  />
                  <Form.Input
                    name='newPassword'
                    icon='lock'
                    iconPosition='left'
                    placeholder=' New Password'
                  />
                  <Button type='submit' color='olive' fluid size='small'>RESET PASSWORD</Button>
                </Segment>
              </Form>
            </Grid.Column>
          </Grid>
        </div>
      </div>
    )
  }
}
//





const mapState = null;

const mapDispatch = (dispatch, ownProps) => ({
  onPasswordSubmit(event) {
    event.preventDefault();
    dispatch(passwordReset({
      email: event.target.email.value,
      currentPass: event.target.currentPassword.value,
      newPass: event.target.newPassword.value
    }))
    history.push('/products')
  }
})

export default connect(mapState, mapDispatch)(Home);

