import styled from 'styled-components';
import {motion, AnimateSharedLayout, A} from 'framer-motion';
import loadDetails from "../Action/detailsAction";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import {popup} from "../animation";
const Game = ({name, released, image, id}) => {
  console.log("print");
  const stringPathId = id.toString();
  //Load Detail Handler
  const dispatch = useDispatch();
  const loadDetailHandler = () => {
    document.body.style.overflow = "hidden";
    dispatch(loadDetails(id));
  };
    return (
    <StyledGame
    variants = {popup}
    initial = "hidden"
    animate = "show"
      layoutId = {stringPathId}
      onClick = {loadDetailHandler}>
    <Link to = {`/game/${id}`}>
    <motion.h3   layoutId = {`title ${stringPathId}`}>{name}</motion.h3>
    <p>{released}</p>
    <motion.img
      layoutId = {`image ${stringPathId}`}
    src = {image} alt = {name}/>
    </Link>
  </StyledGame>);
};
const StyledGame = styled(motion.div)`
  min-height: 30vh;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  border-radius: 1rem;
  cursor: pointer;
  overflow: hidden;
  img {
    width: 100%;
    height: 40vh;
    object-fit: cover;
  }
`;

export default Game;
