import axios from 'axios';
import { returnErrors } from './errorActions';
import { GET_CART, ADD_TO_CART, DELETE_FROM_CART, CART_LOADING } from './types';

export const getCart = (id) => dispatch => {
    
    dispatch(setCartLoading());
    
    axios.get(`/api/cart/${id}`)
        .then(res => dispatch({
            type: GET_CART,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const addToCart = (id, productId, quantity) => dispatch => {
    console.log(productId);
    axios.post(`/api/cart/${id}`, {productId, quantity})
        .then(res => {
            console.log(res.data);
            dispatch({
            type: ADD_TO_CART,
            payload: res.data
        })})
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const deleteFromCart = (userId, itemId) => dispatch => {
    axios.delete(`/api/cart/${userId}/${itemId}`)
        .then(res => dispatch({
            type: DELETE_FROM_CART,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const setCartLoading = () => {
    return{
        type: CART_LOADING
    }
}

export const updateCart = (userId, productId, qty) => dispatch => {
    dispatch(setCartLoading());
    axios.put(`/api/cart/${userId}`, {productId, qty})
        .then(res => dispatch({
            type: GET_CART,
            payload: res.data
        }))
        .catch(err => {
          console.log("Error in update cart:", err);
          dispatch(returnErrors(err.response.data, err.response.status))
        });
  }