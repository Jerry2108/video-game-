import{
    USER_LOADING,
    USER_LOADED,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    AUTH_ERROR
}
from '../actions/types'

//an authorization server creates a JWT at the request of a client and signs it so that it cannot be altered by any other party. The client will then send this JWT with its request to a REST API. The REST API will verify that the JWT’s signature matches its payload and header to determine that the JWT is valid. When the REST API has verified the JWT, it can use the claims to either grant or deny the client’s request.
const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: false,
    user: null
}
export default function authReducer(state=initialState, action){
    switch(action.type){
        case USER_LOADING:
            return{
                ...state,
                isLoading: true
            };
        case USER_LOADED:
            return{
                ...state,
                isLoading: false,
                user: action.payload
            };
        //replace the initial token by a new token sent by a server in a payload. 
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return{
                ...state,
                user: action.payload.user,
                isAuthenticated: true,
                isLoading: false
            };
        case LOGIN_FAIL:
        case REGISTER_FAIL: 
        case AUTH_ERROR:
        case LOGOUT_SUCCESS:
            //Because authentication has failed, this mean the token is invalid => client should remove it from their local storage.
            localStorage.removeItem('token');
            return{
                token: null,
                isAuthenticated: false,
                isLoading: null,
                user: null
            };
        default:
            return state;
    }
}