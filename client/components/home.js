import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Container, Segment,Header } from 'semantic-ui-react'
import {
  Button,
  Icon,
} from 'semantic-ui-react'

const Home = () => (
  <div className="indexBackground">
    <div style={{ margin: 'auto' }} className='contactUs'>
      {/* <div  dangerouslySetInnerHTML={ {__html: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d153401.0153922199!2d73.3748474520457!3d-53.0762337592925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xb301524b88922bfd%3A0x261ddac2e5b3767e!2sHeard+Island+and+McDonald+Islands!5e0!3m2!1sen!2sus!4v1520220127721" width="400" height="300" frameborder="0" style="border:0" allowfullscreen></iframe>'} }/> */}
      <Segment inverted secondary color={'olive'} raised circular textAlign='center'>
        <Header inverted as={'h1'}> "THE BEST WINES ARE THE ONES WE DRINK WITH FRIENDS.""</Header>
        <Header inverted as={'h3'}> - LITERALLY SOMEONE </Header>
      </Segment>
    </div>
  </div>
)

export default Home