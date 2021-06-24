const initState = {
  popular : [],
  newGames : [],
  upComing : [],
  searched: [],
};
const gamesReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_GAMES":
      return{
        ...state,
        popular: action.payload.popular,
        upComing: action.payload.upcoming,
        newGames: action.payload.new,
      };
    case "FETCH_SEARCHED":
      return {
        ...state,
        searched: action.payload.searched,
      };
    case "CLEAR_SEARCHED":
      return {
        ...state,
        searched: [],
      };
    default:
      return { ...state };
  }
};
export default gamesReducer;
