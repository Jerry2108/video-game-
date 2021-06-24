import axios from "axios";
import {gamesDetailsURL, gamesScreenShotURL} from "../api";
/*loadDetails returns an asynchronous function taking dispatch as its argument */
const loadDetails = (gameID) => async(dispatch) =>{
  dispatch({type: "LOADING_DETAILS"}); 
  const details = await axios.get(gamesDetailsURL(gameID));
  const screenshots = await axios.get(gamesScreenShotURL(gameID));
  dispatch({
    type: "GET_DETAILS",
    payload:{
      details: details.data,
      screenshots: screenshots.data
    }});
};
export default loadDetails;
