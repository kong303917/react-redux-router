import React from 'react'
import { connect } from 'react-redux'
import { qr } from '../actions'

import history from '../history'

import qrSelector from '../selectors/qrSelector'

import Qr from '../components/qr.jsx'

class loginContainer extends React.Component {

    componentWillUpdate(nextProps, nextState) {
        if(!nextProps.isLogin){
            history.replace({
                pathname: '/'
            });
        }
    }
    render() {
        const { dispatch, isFetching, img, isLogin } = this.props;
        return (
            <div>
                {isFetching && <p>isFetching ... </p>}
                <Qr qr={ (code) => dispatch( qr(code) )} img={img} isLogin={isLogin}/>
            </div>
        )
    }
}

loginContainer.propTypes = {
    isFetching: React.PropTypes.bool.isRequired
}

export default connect(qrSelector)(loginContainer);