import React, { Component } from 'react'

export default class UnAuthUserHome extends Component {
  constuctor(props) {
    super(props)
    this.state = {
      over21: false
    }
  }
  render() {
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
        <div>
          <button onClick={() => this.setState({ over21: true })}>
            Click here if you are over 21 to use this website
          </button>
        </div>
      )
    }

    return (
      { homeOrAgeGate }
    )
  }
}