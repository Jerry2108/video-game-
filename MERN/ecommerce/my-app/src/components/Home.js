import { Component } from "react";
import { connect } from "react-redux";
import { getItems } from "../actions/itemActions.js";
import { addToCart } from "../actions/cartActions.js";
import PropTypes from "prop-types";
import {
  Card,
  CardBody,
  CardSubtitle,
  Button,
  CardTitle,
  Alert,
  CardImg,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Row, Col } from "react-bootstrap";
import AppNavBar from "./AppNavBar.js";
import Landing from "./Landing.js";
import store from "../store.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faListSquares,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { logout } from "../actions/authActions.js";

class Home extends Component {
  //Fetch all items from the back end to display.
  constructor(props) {
    super(props);
    this.addAnItemToCart = this.addAnItemToCart.bind(this);
    this.sortPrice = this.sortPrice.bind(this);

    this.state = {
      dropdownOpenCategory: false,
      dropdownOpenSort: false,
      chosenSubjects: [],
    };
  }

  static propTypes = {
    items: PropTypes.array.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    addToCart: PropTypes.func.isRequired,
    user: PropTypes.object,
    getItems: PropTypes.func.isRequired,
  };

  addAnItemToCart = (productId) => async () => {
    /*console.log(this.props.user.id);*/
    /*check if a user has already logined in*/
    if (this.props.isAuthenticated) {
      const userId = this.props.user.id;
      console.log(productId);
      await this.props.addToCart(userId, productId, 1);
      alert("Item added to cart");
    } else {
      alert("You need to log in first");
    }
  };

  toggleCategory = () => {
    this.setState({
      dropdownOpenCategory: !this.state.dropdownOpenCategory,
    });
  };

  toggleSort = () => {
    this.setState({
      dropdownOpenSort: !this.state.dropdownOpenSort,
    });
  };

  showSubjects = async (sub) => {
    if (sub) {
      await this.props.getItems();
      let tmp = this.props.items.filter((item) => item.subject == sub);
      this.setState({ chosenSubjects: tmp });
    } else {
      let tmp = [];
      await this.props.getItems();
      console.log(this.props.items);
      this.setState({ chosenSubjects: tmp });
    }
  };

  sortPrice = (ascending) => {
    if (ascending && this.state.chosenSubjects.length == 0) {
      this.props.items.sort((a, b) => (a.price > b.price ? 1 : -1));
    } else if (!ascending && this.state.chosenSubjects.length == 0) {
      this.props.items.sort((a, b) => (a.price < b.price ? 1 : -1));
    } else if (ascending && this.state.chosenSubjects.length != 0) {
      this.state.chosenSubjects.sort((a, b) => (a.price > b.price ? 1 : -1));
    } else if (!ascending && this.state.chosenSubjects.length != 0) {
      this.state.chosenSubjects.sort((a, b) => (a.price < b.price ? 1 : -1));
    }
  };
  render() {
    //all items
    let items = this.props.items;
    let lengthItems = items.length;
    return (
      <div>
        <AppNavBar />
        <Landing />
        <div id="products-info">
          <div class="filter-section">
            <span>ALL TEXT BOOKS</span>
            <Dropdown
              isOpen={this.state.dropdownOpenCategory}
              toggle={this.toggleCategory.bind(this)}
              size="lg"
              color="blue"
            >
              <DropdownToggle caret color="primary">
                Category
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={() => this.showSubjects(null)}>
                  All Subjects
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={() => this.showSubjects("Biology")}>
                  Biology
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={() => this.showSubjects("Chemistry")}>
                  Chemistry
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={() => this.showSubjects("Math")}>
                  Math
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={() => this.showSubjects("Physics")}>
                  Physics
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Dropdown
              isOpen={this.state.dropdownOpenSort}
              toggle={this.toggleSort.bind(this)}
              size="lg"
              color="blue"
            >
              <DropdownToggle caret color="primary">
                Sort By
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={() => this.sortPrice(true)}>
                  Price (Low To High)
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={() => this.sortPrice(false)}>
                  Price (High To Low)
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <hr />
          <div class="products-display">
            {this.state.chosenSubjects.length == 0 ? (
              <Row>
                {items.map((item) => (
                  <Col md={3}>
                    <Card className="mb-4 h-100">
                      <CardImg src={"./uploads/" + item.image} />
                      <CardBody>
                        <CardTitle tag="h5">{item.title}</CardTitle>
                        <div className="card-feature">
                          <div className="card-feature-child" id="price">
                            <h4>${item.price}</h4>
                          </div>
                          <div className="card-feature-child" id="shoppingCart">
                            <FontAwesomeIcon
                              icon={faShoppingCart}
                              size="lg"
                              onClick={this.addAnItemToCart(item._id)}
                            />
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                ))}
              </Row>
            ) : (
              <Row>
                {this.state.chosenSubjects.map((item) => (
                  <Col md={3}>
                    <Card className="mb-4">
                      <CardImg src={"./uploads/" + item.image} />
                      <CardBody>
                        <CardTitle tag="h5">{item.title}</CardTitle>
                        <div className="card-feature">
                          <div className="card-feature-child" id="price">
                            <h4>${item.price}</h4>
                          </div>
                          <div className="card-feature-child" id="shoppingCart">
                            <FontAwesomeIcon
                              icon={faShoppingCart}
                              size="lg"
                              onClick={this.addAnItemToCart(item.productId)}
                            />
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
            {items.length == 0 && (
              <Alert color="danger">No Products Found !</Alert>
            )}
          </div>
        </div>
      </div>
    );
  }
}

//Add the event handler for the shopping cart onclick event
/*$( "#shoppingCart" ).on("click", function(){
  console.log("click");
  //Make sure a user has already logined to the website
  console.log($(this));
});*/

//The Input state is the state in combinedReducer.js
const mapStateToProps = (state) => ({
  items: state.item.items,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

/*<Dropdown
isOpen={this.state.dropdownOpen}
toggle={this.toggleDropdown.bind(this)}
size = "lg"
>
<DropdownToggle caret color = "blue">Category</DropdownToggle>
<DropdownMenu>
  <DropdownItem onClick = {this.showSubjects.bind(this)}>Biology</DropdownItem>
  <DropdownItem divider />
  <DropdownItem onClick = {this.showSubjects.bind(this)}>Chemistry</DropdownItem>
  <DropdownItem divider />
  <DropdownItem  onClick = {this.showSubjects.bind(this)}>English</DropdownItem>
  <DropdownItem divider />
  <DropdownItem onClick = {this.showSubjects.bind(this)}>Math</DropdownItem>
  <DropdownItem divider />
  <DropdownItem onClick = {this.showSubjects.bind(this)}>Physics</DropdownItem>
</DropdownMenu>
</Dropdown>*/

export default connect(mapStateToProps, { addToCart, getItems })(Home);
