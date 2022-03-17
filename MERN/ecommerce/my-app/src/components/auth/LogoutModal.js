import {Component, Fragment} from 'react'; 
import {connect} from 'react-redux';
import {Button,NavLink} from 'reactstrap';
import PropTypes from 'prop-types';
import {logout} from '../../actions/authActions.js';

export class LogOut extends Component{
    static propTypes = {
        logout: PropTypes.func.isRequired
    }

    render(){
        return(
        <Fragment>
            <Button color = "danger" className = "btn btn-lg"><NavLink href = "#" className = "text-light" onClick = {this.props.logout}></NavLink></Button>
        </Fragment>)
    }
}

export default connect(null,{logout})(LogOut);
