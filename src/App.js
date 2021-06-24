
import './App.css';
import Home from './pages/home.js';
import GlobalStyles from './Components/GlobalStyles';
import {Route} from "react-router-dom";
import Nav from './Components/Nav';
function App() {
  return (
    <div className="App">
    <GlobalStyles/>
    <Route path= {["/game:id", "/"]}>
    <Nav /> 
      <Home />
    </Route>
    </div>
  );
}

export default App;
