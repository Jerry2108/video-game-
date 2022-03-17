import { Component } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  NavLink,
  Alert,
} from "reactstrap";
import { clearErrors } from "../../actions/errorActions.js";
import { register } from "../../actions/authActions.js";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";

class RegisterModal extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      msg: null,
      email: "",
      password: "",
      name: "",
      backToHome: false,
    };
  }
  //initialize state without a constructor
  //modal is set to be false by default because it is only true when a user has already been authenticated.

  //set validation for properties.
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };
  //this method gets called by React automatically, after each update(setState is called in either toggle/onChange)
  componentDidUpdate(prevProps) {
    const { error } = this.props;

    if (prevProps.error !== error) {
      if (error.id === "REGISTER_FAIL") {
        //alert("Login Failed. Please Check Your Password and Email.")
        this.setState({ msg: error.msg });
      } else if (this.props.isAuthenticated) {
        this.setState({ backToHome: true });
      }
    }
  }

  //change email, password
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });

    //console.log(this.state);
  }

  //call Axios request for login.
  //pass user information to the login action.
  onSubmit(event) {
    event.preventDefault();
    const { password, email, name } = this.state;
    const user = { password, email, name };
    this.props.register(user);
  }
  render() {
    return (
      <div className="authPage">
        <h1>signUp</h1>
        <h5>Already have an account</h5>
        <Link to="/login">Sign in here</Link>
        <div className="authInfo">
          <Form onSubmit={this.onSubmit}>
            <FormGroup>
              <Label for="Name">Name</Label>
              <Input
                onChange={this.onChange}
                type="name"
                name="name"
                placeholder="Register your name"
                value={this.state.name}
              />
            </FormGroup>
            <FormGroup>
              <Label for="Email">Email</Label>
              <Input
                onChange={this.onChange}
                type="email"
                name="email"
                placeholder="Register your email"
                value={this.state.email}
              />
            </FormGroup>
            <FormGroup>
              <Label for="Password">Password</Label>
              <Input
                onChange={this.onChange.bind(this)}
                type="password"
                name="password"
                placeholder="Set up your password"
                value={this.state.password}
              />
            </FormGroup>
            <Button color="dark" style={{ marginTop: "1rem", width: "200px" }}>
              Register
            </Button>
          </Form>
          <img src="./assets/images/authImage.jpg" />
        </div>
        {this.props.isAuthenticated ? <Navigate to="/home" /> : null}
      </div>
    );
  }
}

//The 2 properities : isAuthenticated, error in the loginModal component are connected with the Redux state (created in ./reducers/combinedReducer)
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

//connect the state of redux with the state of this class
//connect(mapStateToProps, mapStateToDispatch)(Name of component class)
export default connect(mapStateToProps, { register, clearErrors })(
  RegisterModal
);
