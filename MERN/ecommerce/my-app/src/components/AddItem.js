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
import { addItem, postImage } from "../actions/itemActions.js";
import AppNavBar from "./AppNavBar.js";
import { Fragment, Component } from "react";
import FormData from "form-data";
//This component is used to add Item to the store.
class AddItem extends Component {
  constructor(props) {
    super(props);
    this.eventHandler = this.eventHandler.bind(this);
    this.state = {
      title: "",
      subject: "",
      price: "",
      year: "",
      image: null,
    };
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    addItem: PropTypes.func.isRequired,
    postImage: PropTypes.func.isRequired,
  };
  eventHandler(event) {
    if (event.target.type === "file") {
      this.setState({ image: event.target.files[0] });
      //console.log(this.state);
      return;
    }
    this.setState({ [event.target.name]: event.target.value });
  }
  addAnItemToTheStore = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("image", this.state.image);
    console.log(this.state.image);
    let item = {
      title: this.state.title,
      year: this.state.year,
      price: this.state.price,
      subject: this.state.subject,
      image: this.state.image.name,
    };
    //Upload Image to the server first
    await this.props.postImage(fd);

    //Add Image to the MongoDB
    await this.props.addItem(item);
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
    var years = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
    const chooseSubject = subjects.map((subject) => <option>{subject}</option>);
    const chooseYear = years.map((year) => <option>{year}</option>);
    return (
      <Fragment>
        <AppNavBar />
        <Container>
          <h2 className="text-center mb-3">Sell A New Text Book</h2>
          {isAuthenticated ? (
            <Form onSubmit={this.addAnItemToTheStore}>
              <Label>Title</Label>
              <FormGroup>
                <Input
                  type="title"
                  name="title"
                  placeholder="Enter The Subject's Title"
                  onChange={this.eventHandler}
                />
              </FormGroup>
              <Label>Subject</Label>
              <FormGroup>
                <Input
                  type="select"
                  name="subject"
                  placeholder="Choose Which Subject"
                  onChange={this.eventHandler}
                >
                  {chooseSubject}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label>Year</Label>
                <Input type="select" name="year" onChange={this.eventHandler}>
                  {chooseYear}
                </Input>
              </FormGroup>
              <Label>Price</Label>
              <FormGroup>
                <Input
                  type="price"
                  name="price"
                  placeholder="How Much Do You Want To Sell Your Book"
                  onChange={this.eventHandler}
                />
              </FormGroup>
              <FormGroup>
                <Input type="file" name="image" onChange={this.eventHandler} />
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
export default connect(mapStateToProps, { addItem, postImage })(AddItem);
