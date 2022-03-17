import {Component} from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import store from './store.js';
import Main from './components/Main';
import {loadUser} from './actions/authActions.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import ErrorBoundary from './components/ErrorBoundary.js'; 
import {getItems} from './actions/itemActions.js';
class App extends Component{
  //componentDidMount is called after render is called.
  //This is where we modify the components's state. 

  componentDidMount(){
    this.fetch();
  }
  fetch = async()=>{
    try{
      let userStatus = await store.dispatch(loadUser());
      let fetchStore = await store.dispatch(getItems());
    }
    catch(errors){
      console.log(errors);
    }
  }
  //render() is where React JSX elements are created.
  //render() does not modify the component 's state. 
  render(){
    return(
      <Provider store = {store}>
        <BrowserRouter>
          <div className = "App">
            <ErrorBoundary>
              <Main />
            </ErrorBoundary>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;