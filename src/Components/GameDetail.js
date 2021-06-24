import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import {motion, AnimatePresence} from "framer-motion";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {useHistory} from "react-router-dom";
import CancelIcon from '@material-ui/icons/Cancel';
//IMAGES
import playstation from "../img/playstation.svg";
import steam from "../img/steam.svg";
import xbox from "../img/xbox.svg";
import nintendo from "../img/nintendo.svg";
import apple from "../img/apple.svg";
import gamepad from "../img/gamepad.svg";
//Star Images
import starEmpty from "../img/star-empty.png";
import starFull from "../img/star-full.png";
//Images

const GameDetail = ({pathId}) => {
  const history = useHistory();
  //Exit Detail
  const exitDetailHandler = (e)  =>{
    const element = e.target;
    console.log(element);
    if (element.classList.contains("exit")){
      document.body.style.overflow = 'auto';
      history.push("/");
    }
  };
  const {details, screenshots, isLoading}= useSelector(state => state.details);
  const games =  useSelector(state => state.games);
  const getStars = (rating) => {
    const stars = [];
    rating = Math.floor(rating);
    for(let i = 1; i <= 5;i++){
      if (i <= rating ){
        stars.push(<img alt = "star" key = {i} src = {starFull}></img>);
      }
      else{
        stars.push(<img alt = "star" key = {i} src = {starEmpty}></img>);
      }
    }
    return stars;

  }
  const getPlatform = (platform) =>{
    switch(platform){
      case "PlayStation 4":
      return playstation;
      case "Xbox one":
      return xbox;
      case "PC":
      return steam;
      case "Nitendo Switch":
      return nintendo;
      case "IOS":
      return apple;
      default:
      return gamepad;
    }
  };

  return(
    <>
      {!isLoading && (
        <CardShadow  onClick={exitDetailHandler}>
        <Exit >
          <CancelIcon className = "exit" style = {{fontSize: 70}} onClick = {exitDetailHandler} />
          </Exit>
          <Detail layoutId={pathId}>
            <Stats>
              <div className="rating">
                <motion.h3 layoutId={`title ${pathId}`}>{details.name}</motion.h3>
                <p>Rating: {details.rating}</p>
                {getStars(details.rating)}
              </div>
              <Info>
                <h3>Platforms</h3>
                <Platforms>
                  {details.platforms.map((data) => (
                    <img
                      alt={data.platform.name}
                      key={data.platform.id}
                      src={getPlatform(data.platform.name)}
                    ></img>
                  ))}
                </Platforms>
              </Info>
            </Stats>
            <Media>
              <motion.img
                layoutId={`image ${pathId}`}
                src={details.background_image}
                alt={details.background_image}
              />
            </Media>
            <Description>
              <p>{details.description_raw}</p>
            </Description>
            <div className="gallery">
              {screenshots.results.map((screen) => (
                <img
                  src={screen.image}
                  key={screen.id}
                  alt={screen.image}
                />
              ))}
            </div>
          </Detail>
        </CardShadow>
      )}
    </>
  );
};

const CardShadow = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  overflow-y: scroll;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ff7676;
  }

  &::-webkit-scrollbar-track {
    background: white;
  }
`;

const Detail = styled(motion.div)`
  width: 80%;
  border-radius: 1rem;
  padding: 2rem 5rem;
  background: white;
  position: absolute;
  left: 10%;
  color: black;
  z-index: 10;
  .gallery{
  display: flex;
  flex-direction: column;
  align-items: center;
  img{
    width: 60%;
    margin-bottom: 2rem;
  }
}
`;


const Stats = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    width: 2rem;
    height: 2rem;
    display: inline;
  }
`;
const Info = styled(motion.div)`
  text-align: center;
`;
const Platforms = styled(motion.div)`
  display: flex;
  justify-content: space-evenly;
  img {
    margin-left: 3rem;
  }
`;


const Media = styled(motion.div)`
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 60%;
  }
`;

const Description = styled(motion.div)`
  margin: 5rem 0rem;
`;
const Exit = styled(motion.div)`
  margin-bottom: 2rem;
  .exit{
    float: right;
    padding-right: 1rem;
  }
`;
export default GameDetail;
