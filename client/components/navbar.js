import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout, me } from "../store";
import { Menu, Segment, Image, Dropdown } from "semantic-ui-react";
import { fetchCart } from "../store/cart";
import history from '../history'


class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = { activeItem: "about" };
    this.setActiveItem = this.setActiveItem.bind(this);
  }

  componentWillMount() {
    this.props.getAdmissionData()
  }

  componentWillUpdate(nextProps) {
    //const { isLoggedIn, changePassFlag } = this.props
    console.log('props', this.props)
    console.log('this.props log' ,this.props.isLoggedIn)
    console.log('this.props flag' ,this.props.changePassFlag)
    console.log('nextProps log' ,nextProps.isLoggedIn)
    console.log('nextProps flag' ,nextProps.changePassFlag)
    if (nextProps.isLoggedIn && nextProps.changePassFlag) {
      console.log('history is being made');
      history.push('/changePassword')
      // Navbar.forceUpdate();
    }
  }
  // shouldComponentUpdate(nextProps) {
  //   if (nextProps !== this.props) {
  //     return true;
  //   }
  // }


  setActiveItem = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    //if user is logged in && changePassFlag === true && 
    //url matches changePassword
    return (
      <Segment className="navbar">
        <Menu pointing secondary className="navbar">
          <Image src="/img/logo.jpg" href="/" size='tiny' verticalAlign='bottom' />
          <Menu.Item
            className="logo"
            as={Link}
            to="/"
            name="Boozy Wines"
            active={activeItem === "Boozy Wines"}
            onClick={this.setActiveItem}
          />
          <Menu.Menu position="right">
            <Menu.Item
              as={Link}
              to="/about"
              name="about"
              active={activeItem === "about"}
              onClick={this.setActiveItem}
            />
            <Menu.Item
              as={Link}
              to="/products"
              name="wines"
              active={activeItem === "wines"}
              onClick={this.setActiveItem}
            />
            <Menu.Item
              as={Link}
              to="/contact"
              name="contact"
              active={activeItem === "contact"}
              onClick={this.setActiveItem}
            />

            {this.props.isAdmin && (
              <Dropdown item text='Admin'>
              <Dropdown.Menu>
                <Dropdown.Item href={`/allProducts`}>Review Products</Dropdown.Item>
                <Dropdown.Item href={`/allUsers`}>Review Users</Dropdown.Item>
                <Dropdown.Item href={`/allOrders`}>Review Orders</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            )}



            {this.props.isLoggedIn && (
              <Menu.Item
                as={Link}
                to="/logout"
                name="Logout"
                active={activeItem === "Logout"}
                onClick={this.props.handleClick}
              />
            )}

            {!this.props.isLoggedIn && (
              <Menu.Item
                as={Link}
                fitted="vertically"
                to="/login"
                name="Login"
                active={activeItem === "Login"}
                onClick={this.setActiveItem}
              />
            )}
            {!this.props.isLoggedIn && (
              <Menu.Item
                as={Link}
                fitted="vertically"
                to="/signup"
                name="Sign Up"
                active={activeItem === "Sign Up"}
                onClick={this.setActiveItem}
              />
            )}
            <Menu.Item
              as={Link}
              to="/cart"
              name="cart"
              icon='cart'
              active={activeItem === "cart"}
              onClick={this.setActiveItem}
            />
          </Menu.Menu>
        </Menu>
      </Segment>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.isAdmin,
    changePassFlag: state.user.changePassFlag
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
      dispatch(fetchCart(document.cookie))
    },
    getAdmissionData() {
      dispatch(me())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
