import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  componentDidCatch() {
    //display the fallback UI to the browser
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    //display whatever components wrapped by the ErrorBounday components
    return this.props.children;
  }
}

export default ErrorBoundary;
