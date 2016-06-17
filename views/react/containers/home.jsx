import React from 'react'
import { connect } from 'react-redux'

import loginSelector from '../selectors/loginSelector'

import Index from '../components/index.jsx'

class loginContainer extends React.Component {
    render() {
        const { isLogin } = this.props;
        return (
            <Index>
                {
                    isLogin
                    ?
                    <div>
                        你可以使用 本网址的功能
                    </div>
                    :
                    <div>
                        你还未登录,请先登录, 方可使用相关功能
                    </div>
                }
            </Index>
        )
    }
}

loginContainer.propTypes = {
    isLogin: React.PropTypes.bool.isRequired,
    isLogining: React.PropTypes.bool.isRequired
}

export default connect(loginSelector)(loginContainer);