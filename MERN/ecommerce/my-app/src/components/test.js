import { connect } from "react-redux";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Alert,
  Button,
} from "reactstrap";
import PropTypes from "prop-types";
import { addItem } from "../actions/itemActions.js";
import AppNavBar from "./AppNavBar.js";
import { Fragment, Component } from "react";
import FormData from 'form-data';
//This component is used to add Item to the store.
class AddItem extends Component {
  constructor(props) {
    super(props);
    this.eventHandler = this.eventHandler.bind(this);
    this.state = {
      title: "",
      category: "",
      price: "",
      year: "",
      image: null,
    };
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    addItem: PropTypes.func.isRequired,
  };
  eventHandler(event) {
    if(event.target.type === 'file'){
      const form = new Fo
    

      fd.append('image', file);
      this.setState({image:fd} );
      //console.log(this.state);
      return;
    }
    this.setState({ [event.target.name]: event.target.value });
  }
  addAnItemToTheStore = async (e) => {
    e.preventDefault();
    const newItem = {
      title: this.state.title,
      subject: this.state.subject,
      price: this.state.price,
      year: this.state.year,
      image: this.state.image,
    };
    await this.props.addItem(newItem);
    alert("A new item is successfully added to the store");
  };
  render() {
    const isAuthenticated = this.props.isAuthenticated;
    var subjects = [
      "Math",
      "English",
      "Literature",
      "Chemistry",
      "Physics",
      "Biology",
    ].sort();
    var years = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const chooseSubject = subjects.map((subject) => <option>{subject}</option>);
    const chooseYear = years.map((year) => <option>{year}</option>);
    return (
      <Fragment>
        <AppNavBar />
        <Container>
          <h2 className="text-center mb-3">Sell A New Text Book</h2>
          {isAuthenticated ? (
            <Form>
              <FormGroup>
                <Input type="file" name="image" onChange = {this.eventHandler}/>
              </FormGroup>
              <Button color="dark" style={{ marginTop: "2rem" }}>
                Sell A New Book Now
              </Button>
            </Form>
          ) : (
            <Alert className="text-center">Please log in first !</Alert>
          )}
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { addItem })(AddItem);
