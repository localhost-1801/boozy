import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Login, Signup, UserHome, Home, UnAuthUserHome, Contact, About, SingleProduct, Products, Cart, Orders, Edit, New, AdminAllProducts, AllUsers, ChangePass, AllOrders } from './components'
import { me } from './store'
import { fetchProducts } from './store/products.js'


/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const { isLoggedIn, isAdmin } = this.props
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/about" component={About} />
        <Route exact path="/ageGate" component={UnAuthUserHome} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/allOrders" component={AllOrders} />
        <Route path="/wines" component={Products} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/products/update/:id" component={Edit} />
        <Route path="/products/:id" component={SingleProduct} />
        <Route path="/contact" component={Contact} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/orders" component={Orders} />
        <Route path="/new" component={New} />

        {
          isLoggedIn &&
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/changePassword" component={ChangePass} />
            <Route path="/userhome" component={UserHome} />
            <Route exact path="/allUsers" component={AllUsers} />
            <Route path="/allProducts" component={AdminAllProducts} />
          </Switch>
        }

        {
          isAdmin &&
          <Switch>
            <Route exact path="/allUsers" component={AllUsers} />
            <Route path="/allProducts" component={AdminAllProducts} />
          </Switch>
        }

        {/* Displays our Login component as a fallback */}
        <Route component={Login} />

      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.isAdmin
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me())
      dispatch(fetchProducts())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
}
