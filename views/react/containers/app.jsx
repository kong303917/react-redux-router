import React from 'react'
import { connect } from 'react-redux'

import indexSelector from '../selectors/indexSelector'

import Header from '../components/header.jsx'
import Footer from '../components/footer.jsx'
import Index from '../components/index.jsx'

//import { logout } from '../actions'

//import Auth from '../auth/auth'

class App extends React.Component {
    //componentWillMount() {
    //    console.log(this.props.isLogin);
    //    if(!this.props.isLogin){
    //        Auth.logout();
    //    }
    //}

    render() {
        //const { dispatch } = this.props;
        //console.log(this);
        //Auth.test();
        return (
            <div>
                <Header {...this.props}/>
                <div>
                    {this.props.children}
                </div>
                <Footer/>
            </div>
        )
    }
}

App.propTypes = {
    isLogin: React.PropTypes.bool.isRequired
}

export default connect(indexSelector)(App);