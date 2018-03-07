import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {Container, Header} from 'semantic-ui-react'
import {
  Button,
  Icon,
} from 'semantic-ui-react'

const Home = () => (
  <div className="indexBackground">
    <Container>
    <Header inverted as='h2'>The best wines are the ones we drink with friends</Header>
    </Container>
  </div>
)

export default Home