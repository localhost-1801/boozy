import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import { Menu, Segment, Image } from "semantic-ui-react";

export default class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = { activeItem: "about" };
  }

  setActiveItem = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Segment className="navbar">
        <Menu pointing secondary className="navbar">
        <Image src="/img/logo.jpg" size='tiny' verticalAlign='bottom' />
          <Menu.Item
            className="logo"
            as={Link}
            to="/"
            name="Boozy Wines"
            active={activeItem === "Boozy Wines"}
            onClick={this.handleItemClick}
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
            {this.props.isLoggedIn && (
                <Menu.Item
                  as={Link}
                  to="/logout"
                  name="Logout"
                  active={activeItem === "logout"}
                  onClick={this.props.handleClick}
                />
            )}
            {!this.props.isLoggedIn && (
                <Menu.Item
                  as={Link}
                  fitted="vertically"
                  to="/login"
                  name="Login"
                  active={activeItem === "login"}
                  onClick={this.setActiveItem}
                />
            )}
            {!this.props.isLoggedIn && (
                <Menu.Item
                  as={Link}
                  fitted="vertically"
                  to="/signup"
                  name="Sign Up"
                  active={activeItem === "signup"}
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
// = ({ handleClick, isLoggedIn }) => (
//   <div>
//     <h1>BOILERMAKER</h1>
//     <nav>
//       {isLoggedIn ? (
//         <div>
//           {/* The navbar will show these links after you log in */}
//           <Link to="/about">Home</Link>
//           <a href="#" onClick={handleClick}>
//             Logout
//           </a>
//         </div>
//       ) : (
//         <div>
//           {/* The navbar will show these links before you log in */}
//           <Link to="/login">Login</Link>
//           <Link to="/signup">Sign Up</Link>
//         </div>
//       )}
//     </nav>
//     <hr />
//   </div>
// )

// /**
//  * CONTAINER
//  */
// const mapState = state => {
//   return {
//     isLoggedIn: !!state.user.id
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     handleClick() {
//       dispatch(logout())
//     }
//   }
// }

// export default connect(mapState, mapDispatch)(Navbar)

// /**
//  * PROP TYPES
//  */
// Navbar.propTypes = {
//   handleClick: PropTypes.func.isRequired,
//   isLoggedIn: PropTypes.bool.isRequired
// }
