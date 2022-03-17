import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
} from "./types.js";
import { returnErrors } from "./errorActions.js";
import axios from "axios";

//When an Axios API is called by a client to the server, the client need to provide a token called API key.
//In this application, a token is sent as a request header.
/*export const loadUser = () => (dispatch, getState) => {
  //first set the type of action to be USER_LOADING before getting data from axios successfully.
  dispatch({ type: USER_LOADING });
    let token = localStorage.getItem('access_token');
    let instance = axios.create({
        baseURL: "http://localhost/4000",
        headers: {
            'Content-Type': 'application/Json',
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*'

        }
    });
    


  //fetch data from an API using axios
  instance
    .get("/api/user")
    .then((res) => dispatch({ type: USER_LOADED, payload: res.data }))
    .catch((errors) => {
      console.log(errors);
      dispatch(returnErrors(errors.response.data, errors.response.status));
      dispatch({ type: AUTH_ERROR });
    });
};*/

export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });

  axios.get("/api/user", tokenConfig(getState))
      .then(res => {
        //console.log(res.data);
        dispatch({
          type: USER_LOADED,
          payload: res.data
      })})
      .catch(err => {
        console.log(err.response.msg);
          dispatch(returnErrors(err.response.data, err.response.status));
          dispatch({
              type: AUTH_ERROR
          });
      });
}


//set up the request header.
const tokenConfig = (getState) => {
  //return the initial default token is stored from the local storage when the user first signup. This token is exchanged,
  //not username/password when
  const token = getState().token;
  //Headers
  const config = {
    headers: {
      "Content-type": "application/json",
      "Clear-Site-Data": "cache",
    },
    proxy: {
      host:'localhost',
      port: 4000
    }
  };

  //x-auth-token
  if (token) {
    config.headers["authorization"] = token;
  }
  return config;
};

//register.
export const register =
  ({ name, email, password }) =>
  (dispatch) => {
    //headers
    const config = {
      headers: {
        "Content-type": "application/json",
      },
      proxy:{
        "host": "localhost",
        "port": 4000
      }
    };
    //convert object into json.
    const registeredInformation = JSON.stringify({ name, email, password });

    axios
      .post("/api/signUp", registeredInformation, config)
      .then((res) => dispatch({ type: REGISTER_SUCCESS, payload: res.data }))
      .catch((errors) => {
        dispatch(
          returnErrors(
            errors.response.data,
            errors.response.status,
            REGISTER_FAIL
          )
        );
        dispatch({ type: REGISTER_FAIL });
      });
  };

//login.
export const login =
  ({ password, email }) =>
  (dispatch) => {
    //headers
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    //convert object into json.
    let registeredInformation = JSON.stringify({ email, password });
    
    axios
      .post("/api/login", registeredInformation, config)
      .then((res) => {
        dispatch({ type: LOGIN_SUCCESS, payload: res.data })})
      .catch((errors) => {
        dispatch(
          returnErrors(errors.response.data, errors.response.status, LOGIN_FAIL)
        );
        dispatch({ type: LOGIN_FAIL });
      });
  };

//logout

export const logout = () => (dispatch) => dispatch({ type: LOGOUT_SUCCESS });
