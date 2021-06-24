const baseURL = "https://rawg.io/api/games?key=bcd1549db21245eb9cf0f3c1b6047b8c";
/*Getting the date*/
const getCurrentMonth = () => {
  const month = new Date().getMonth() + 1;
  if (month < 10){
    return `0${month}`;
  }
  else{
    return month;
  }
}


const getCurrentDay = () => {
  const day = new Date().getDate();
  if (day < 10){
    return `0${day}`;
  }
  else{
    return day;
  }
}
//CurrentDay/Month/Year
const currentYear = new Date().getFullYear();
const currentDay = getCurrentDay();
const currentMonth =  getCurrentMonth();
const currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
const lastYear = `${currentYear - 1}-${currentMonth}-${currentDay}`;
const nextYear = `${currentYear + 1}-${currentMonth}-${currentDay}`;
/*Popular Games,page_size tells you how many games do u want
to fetch*/
const popular_games = `&dates=${lastYear},${currentDate}&ordering=-rating&page_size=10`;
const upcoming_games = `&dates=${currentDate},${nextYear}&ordering=-added&
page_size=10`;
const new_games = `&dates=${lastYear},${currentDate}&ordering=-released&
page_size=10`;
const gamesDetailsBaseURL = "https://api.rawg.io/api/games/"
export const popularGamesURL = () => `${baseURL}${popular_games}`;
export const upcomingGamesURL = () =>`${baseURL}${upcoming_games}`;
export const newGamesURL = () => `${baseURL}${new_games}`;
export const gamesDetailsURL = (gameID) => `${gamesDetailsBaseURL}${gameID}?key=bcd1549db21245eb9cf0f3c1b6047b8c`;
export const gamesScreenShotURL = (gameID) => `${gamesDetailsBaseURL}${gameID}
/screenshots?key=bcd1549db21245eb9cf0f3c1b6047b8c`;
const searchBaseURL = "https://api.rawg.io/api/games"
  export const searchGamesURL = (game_name) => `${searchBaseURL}?search=${game_name}&page_size=9&key=bcd1549db21245eb9cf0f3c1b6047b8c`;
