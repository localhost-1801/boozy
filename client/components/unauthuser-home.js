import React, { Component } from 'react'
import { Icon, Label, Menu, Table, Button } from 'semantic-ui-react';
import Home from './home'

export default class UnAuthUserHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      over21: false
    }
  }//test test
  render() {
    const styles = {
      zIndex: 100,
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

    let homeOrAgeGate;
    if (this.state.over21) {
      homeOrAgeGate = (
       <Home/>
      )
    } else {
      homeOrAgeGate = (
        <div style={styles}>
          <Button type='submit' color='olive' fluid size='small' 
          onClick={() => this.setState({ over21: true })}>
            Click here if you are over 21 to use this website
          </Button>
        </div>
      )
    }
    return (
      homeOrAgeGate
    )
  }
}