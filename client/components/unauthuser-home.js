import React, { Component } from 'react'

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
        <div>
          <h3>Welcome to our Boozy Vineyard and Winery!</h3>
          <p>Please feel free to check out our selection of the finest wines around!</p>
        </div>
      )
    } else {
      homeOrAgeGate = (
        <div style={styles}>
          <button onClick={() => this.setState({ over21: true })}>
            Click here if you are over 21 to use this website
          </button>
        </div>
      )
    }
    console.log(homeOrAgeGate);
    return (
      homeOrAgeGate
    )
  }
}