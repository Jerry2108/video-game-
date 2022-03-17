import { Component, Fragment } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
  NavLink,
  Form,
  FormGroup,
  Input,
  InputGroupText,
  InputGroupAddon,
  NavbarText,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import RegisterModal from "./auth/RegisterModal";
import Logout from "./auth/LogoutModal";
import LoginModal from "./auth/LoginModal";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navigate, Link } from "react-router-dom";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { InputGroup } from "react-bootstrap";
import store from "../store.js";
import { SEARCH_ITEMS } from "../actions/types";
import {logout} from "../actions/authActions.js";

//import {Link} from "react-router";
//import User from "../../../models/User";

class AppNavbar extends Component {
  state = {
    isOpen: false,
    wantToViewOrders: false,
    dropdownOpen: false,
    searchedProducts: ""
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.object.isRequired
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };
  toggleDropdown = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  };
  viewOrder = () => {
    this.setState({ wantToViewOrders: true });
  };
  handleSearchedProducts = (e) =>{
    this.setState({searchedProducts: e.target.value}); 
  }
  submitSearchedProducts = (e) =>{
    e.preventDefault();
    store.dispatch({type: SEARCH_ITEMS, payload: this.state.searchedProducts});
  }
  userLogout = (e) =>{
    this.props.logout();
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;
    console.log(isAuthenticated);

    const userLinks = (
      <div class="items">
        <NavItem>
          <Link to="/home">Home</Link>
        </NavItem>
        <NavItem onClick = {this.userLogout.bind(this)}>
          <Link to="/home">Logout</Link>
        </NavItem>
        <NavItem>
          <FontAwesomeIcon
            icon={faBagShopping}
            onClick={this.viewOrder.bind(this)}
          />
        </NavItem>
        
        {this.state.wantToViewOrders ? (
          <Navigate to="/cart" replace={true} />
        ) : null}
      </div>
    );

    const guestLinks = (
      <div class="items">
        <NavItem>
          <Link to="/home">Home</Link>
        </NavItem>
        <NavItem>
          <Link to="/about">About</Link>
        </NavItem>
        <NavItem>
          <Link to="/login">Login</Link>
        </NavItem>
        <NavItem>
          <Link to="/register">Register</Link>
        </NavItem>
      </div>
    );

    return (
      <div>
        <Navbar expand="sm" className="mb-5">
          <div
            class="d-flex flex-row justify-content-between"
            style={{ width: "100%" }}
          >
            <div>
              <NavbarBrand href="/">Jerry's Book Store</NavbarBrand>
            </div>
            <div class="search" style={{ width: "500px", paddingTop: "1rem" }}>
              <Form className="lg" onSubmit={this.submitSearchedProducts.bind(this)}>
                <FormGroup controlId="navbarSearch">
                  <InputGroup>
                    <Input
                      type="search"
                      placeholder="Search By Name"
                      bsSize="md"
                      onChange = {this.handleSearchedProducts.bind(this)}
                    />
                    <InputGroupText>
                      <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </InputGroupText>
                  </InputGroup>
                </FormGroup>
              </Form>
            </div>

            <div id="linksOnNav">
              <NavbarToggler onClick={this.toggle} />
              <Collapse
                isOpen={this.state.isOpen}
                style={{ right: "2rem" }}
                navbar
              >
                <Nav className="ml-auto" navbar>
                  {!isAuthenticated ? guestLinks : userLinks}
                </Nav>
              </Collapse>
            </div>
          </div>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {logout})(AppNavbar);
