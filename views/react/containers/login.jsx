import React from 'react'
import { connect } from 'react-redux'
import { action_login } from '../actions'

import history from '../history'

import loginSelector from '../selectors/loginSelector'

import Login from '../components/login.jsx'

class loginContainer extends React.Component {
    componentWillUpdate(nextProps, nextState) {
        //console.log(nextProps);
        //console.log(history);
        if(nextProps.isLogin){
            history.replace({
                pathname: '/'
            });
        }
    }

    render() {
        const { dispatch, isLogining } = this.props;
        return (
            <div>
                {isLogining && <p>logining ... </p>}
                <Login login={ (user) => dispatch( action_login(user) )}/>
            </div>
        )
    }
}

loginContainer.propTypes = {
    isLogin: React.PropTypes.bool.isRequired,
    isLogining: React.PropTypes.bool.isRequired
}

export default connect(loginSelector)(loginContainer);