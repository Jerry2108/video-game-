import { Component, Fragment } from "react";
import AppNavbar from "./AppNavBar";
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Alert,
  Form,
  FormGroup,
  Input,
} from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getCart,
  deleteFromCart,
  updateCart,
  addToCart,
} from "../actions/cartActions";
import Checkout from "./CheckOut";
import { checkout } from "../actions/orderActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleMinus, faCirclePlus } from "@fortawesome/free-solid-svg-icons";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      price: 0,
    };
    this.onUpdateQuantity = this.onUpdateQuantity.bind(this);
    this.onDeleteFromCart = this.onDeleteFromCart.bind(this);
  }

  static propTypes = {
    getCart: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    addToCart: PropTypes.func.isRequired,
    deleteFromCart: PropTypes.func.isRequired,
    updateCart: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    cart: PropTypes.object.isRequired,
    checkout: PropTypes.func.isRequired,
  };

  getCartItems = async (id) => {
    await this.props.getCart(id);
    this.state.loaded = true;
  };

  onDeleteFromCart = (id, itemId) => {
    console.log(id);
    console.log(itemId);
    this.props.deleteFromCart(id, itemId);
  };
  onUpdateQuantity = async (userId, productId, quantity) => {
    await this.props.updateCart(userId, productId, quantity);
  };

  render() {
    const user = this.props.user;
    //const items = this.props.cart.cart.items;
    if (this.props.isAuthenticated && !this.props.cart.loading) {
      this.getCartItems(user.id);
    }

    return (
      <div>
        <AppNavbar />

        <h2 style={{ paddingLeft: "200px", fontWeight: "bolder" }}>
          CART SUMMARY
        </h2>
        <hr />
        {this.props.cart.cart ? (
          <div>
            <table>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
              {this.props.cart.cart.items.map((item) => (
                <tr>
                  <td>
                    <div class="cart-info">
                      <img src={"./uploads/" + item.picture} />
                      <div>
                        <p>{item.name}</p>
                        <small>Price: ${item.price}</small>

                        <span
                          onClick={() =>
                            this.onDeleteFromCart(user.id, item.productId)
                          }
                        >
                          Remove
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <FontAwesomeIcon
                      icon={faCircleMinus}
                      onClick={() =>
                        this.onUpdateQuantity(
                          user.id,
                          item.productId,
                          item.quantity - 1
                        )
                      }
                    />
                    <input type="number" value={item.quantity} />
                    <FontAwesomeIcon
                      icon={faCirclePlus}
                      onClick={() =>
                        this.onUpdateQuantity(
                          user.id,
                          item.productId,
                          item.quantity + 1
                        )
                      }
                    />
                  </td>
                  <td>{item.quantity * item.price}</td>
                </tr>
              ))}
            </table>
            <div class="total-price">
              <table>
                <tr>
                  <td>Sub Total</td>
                  <td>${this.props.cart.cart.bill}</td>
                </tr>
                <tr>
                  <td>Tax</td>
                  <td>${this.props.cart.cart.bill / 10}</td>
                </tr>
                <tr>
                  <td>Total</td>
                  <td>
                    $
                    {this.props.cart.cart.bill + this.props.cart.cart.bill / 10}
                  </td>
                </tr>
              </table>
            </div>
            <div style = {{width: "70%", display: "flex", justifyContent: "flex-end"}}>
            <Checkout
              user={user.id}
              amount={this.props.cart.cart.bill}
              checkout={this.props.checkout}
              
            />{" "}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

const qtyBox = {
  display: "flex",
  justifyContent: "space-evenly",
  border: "1px solid #aaa",
  borderRadius: "5px",
  paddingTop: "5px",
  paddingBottom: "5px",
  marginBottom: "5px",
};
const qtyBtn = {
  paddingLeft: "5px",
  paddingRight: "5px",
  borderRadius: "5px",
  marginBottom: "0px",
};

export default connect(mapStateToProps, {
  getCart,
  updateCart,
  deleteFromCart,
  checkout,
  addToCart,
})(Cart);

/*<div id="cart-summary">
<div class="purchase-items">
  {this.props.cart.cart.items.map((item) => (
    <div class="purchase-item">
      <div class="image-title">
        <img src={"./uploads/" + item.picture} />
        <h5>{item.name}</h5>
      </div>

      <div class="price-quantity">
        <div><FontAwesomeIcon icon={faCirclePlus} size = "2x" /></div>
        <span>${item.price * item.quantity}</span>
        <div><FontAwesomeIcon icon={faCircleMinus} size = "2x"/></div>
      </div>
    </div>
  ))}
</div>
<div className="SubTotal">
  <h4>SubTotal</h4>
</div>
</div>*/

/*{this.props.isAuthenticated ? (
  <Fragment>
    {this.props.cart.cart ? null : (
      <Alert color="info" className="text-center">
        Your cart is empty!
      </Alert>
    )}
  </Fragment>
) : (
  <Alert color="danger" className="text-center">
    Login to View!
  </Alert>
)}*/
