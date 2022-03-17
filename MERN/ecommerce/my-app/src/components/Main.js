import { Route, Routes} from "react-router-dom";
import { Component } from "react";
import Home from "./Home.js";
import Cart from "./Cart.js";
import Order from "./Order.js";
import AddItem from "./AddItem.js";
import LoginModal from "./auth/LoginModal.js";
import Register from "./auth/RegisterModal.js";
import LogoutModal from "./auth/LogoutModal.js";

class Main extends Component {
  render() {
    return (
      <Routes>
          <Route exact path="/home" element = {<Home />}>
          </Route>
          <Route exact path="/cart" element = {<Cart />}>
          </Route>
          <Route exact path="/orders" element = {<Order />}>
          </Route>
          <Route exact path="/addItem" element = {<AddItem />}> 
          </Route>
          <Route exact path="/login" element = {<LoginModal />}></Route>
          <Route exact path = "/register" element = {<Register />}></Route>
          <Route exact path = "/logout" element = {<LogoutModal />}></Route>
        </Routes>
    );
  }
}
//export default withRouter(connect()(Main));
export default Main; 

