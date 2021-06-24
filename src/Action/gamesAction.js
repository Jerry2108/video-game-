import axios from "axios";
import {popularGamesURL, upcomingGamesURL, newGamesURL
, searchGamesURL}  from "../api";

const loadGames = () => async (dispatch) => {
  const popularData = await axios.get(popularGamesURL());
  const upcomingData = await axios.get(upcomingGamesURL());
  const newData = await axios.get(newGamesURL());
  console.log(upcomingData.data.results);
  dispatch({
    type: "FETCH_GAMES",
    payload:{
      popular:popularData.data.results,
      upcoming: upcomingData.data.results,
    new: newData.data.results}
  });
};

export const fetch_search = (game_name) => async (dispatch) => {
  const searchGames = await axios.get(searchGamesURL(game_name));

  dispatch({
    type: "FETCH_SEARCHED",
    payload: {
      searched: searchGames.data.results,
    },
  });
};


export default loadGames;
