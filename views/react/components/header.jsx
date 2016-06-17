/**
 * Created by zjy on 16-2-19.
 */
import React from 'react'
import { Link, IndexLink } from 'react-router'
import { action_logout } from '../actions'
//import Auth from '../auth/auth'
export default class Header extends React.Component {
    handleClick(e) {
        e.preventDefault();
        console.log(this.props);
        //this.props.out();
        this.props.dispatch(action_logout());
        //Auth.logout();
    }
    render() {
        const { isLogin, user } = this.props;
        return (
            <header className="text-center bg-info">
                <ul className="nav">
                    <li><IndexLink to="/" activeClassName="active">首页</IndexLink></li>
                    {isLogin
                        ? <l>
                        <li><Link to="/qr" activeClassName="active">二维码生成</Link></li>
                        <li> {user.username} </li>
                        <li> <a onClick={ e => this.handleClick(e)} href="#"> 注销 </a></li>
                        </l>
                        : <li> <Link property="" to="/login"  activeClassName="active"> 登录 </Link> </li>
                    }
                </ul>
            </header>
        );
    }
}