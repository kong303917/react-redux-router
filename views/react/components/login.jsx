/**
 * Created by zjy on 16-2-19.
 */
import React from 'react'
import { Link, Redirect } from 'react-router'
export default class Login extends React.Component {
    handleClick(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        if(username.trim() && password.trim()){
            const user=  {
                username: username,
                password: password
            };
           this.props.login(user);
        }
        else{
            alert('empty');
        }
    }
    render() {
        return (
            <div>
                <form>
                    <label>
                        帐号:
                        <input type="text" name="username" id="username" value="zjy"/>zjy
                    </label>
                    <br/>
                    <label>
                        密码:
                        <input type="password" name="password" id="password" value="111111"/>111111
                    </label>
                    <br/>
                    <input type="submit" value="登录" onClick={ e => this.handleClick(e) }/>
                </form>
            </div>
        );
    }
}