import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'; 
import {composeWithDevTools} from 'redux-devtools-extension';
import combinedReducer from './reducers/combinedReducer';



//initial state
const initialState = {}

//store enhancers allows us to modify our stores. But we need to compose multiple enhancers into one enhancer by using the compose method.
//applyMiddleware(thunk) is a special enhancer
//const storeEnhancers = compose(applyMiddleware(thunk), other enhancers)


//composeWithDevTools can be replaced with compose to make the code simpler.
const storeEnhancers = composeWithDevTools(applyMiddleware(thunk));
const store = createStore(combinedReducer, initialState, storeEnhancers);
export default store;
