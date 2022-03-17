import {React, useState} from 'react';
import {Button} from "reactstrap";
import {useNavigate} from "react-router-dom";
import {connect} from "react-redux"; 
import {Link, animateScroll as scroll} from "react-scroll";

function Landing({isAuthenticated}){
    const sellNow = useState(false);
    let navigate = useNavigate();
    function clickSell(){
        //user needs to login first to sell books
        if(isAuthenticated){
            navigate('/addItem');
        }
        else{
            alert("Please Login First");
        }
    }
        return(
        <div class = "landing">
        <div class = "image">
           <img src ="assets/images/readbook.jpg"/>
        </div>
        <div class = "content">
            <h3>Getting Higher Scores With Us</h3>
            <h5>"Buying books at Jerry's Book Store is never a wrong option for me"</h5>
            <h5>-said by Sherwood Chen </h5>
            <Button size = "lg"><Link activeClass = "active" to="products-info" spy = {true} smooth = {true} duration = {100} offset={-70}>Shop Now</Link></Button>
            <Button size = "lg" style =  {{marginLeft: '2rem'}} onClick = {clickSell}>Sell Now</Button>
            
        </div>
        </div>)
    }

const mapStateToProps = (state)=>({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Landing);


