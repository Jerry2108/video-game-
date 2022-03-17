import axios from "axios";
import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  UPDATE_ITEM,
  ITEMS_LOADING,
} from "./types";
import { returnErrors } from "./errorActions";

export const getItems = () => (dispatch) => {
  dispatch(setItemsLoading());
  axios
    .get("/api/items")
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: GET_ITEMS,
        payload: res.data,
      });
    })

    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const postImage = (image) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  //post image first
  try {
    let post = await axios.post("/api/item/image", image, config);
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};
export const addItem = (item) => (dispatch) => {
  //post input later
  axios
    .post("/api/item", item)
    .then((res) =>
      dispatch({
        type: ADD_ITEM,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteItem = (id) => (dispatch) => {
  axios
    .delete(`/api/items/${id}`)
    .then((res) =>
      dispatch({
        type: DELETE_ITEM,
        payload: id,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const updateItem = (id, item) => (dispatch) => {
  axios
    .put(`/api/items/${id}`, item)
    .then((res) =>
      dispatch({
        type: UPDATE_ITEM,
        payload: Promise.all([id, res.data]),
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING,
  };
};
