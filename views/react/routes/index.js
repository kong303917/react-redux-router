/**
 * Created by zjy on 16-2-22.
 */
import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '../containers/app.jsx' //ui视图
import Home from '../containers/home.jsx' //ui视图
import Login from '../containers/login.jsx' //ui视图
import Qr from '../containers/qr.jsx' //ui视图


//import { loginRequireAuth } from '../auth/loginAuth';

 //无状态（stateless）组件，一个简单的容器，react-router 会根据 route
 //规则匹配到的组件作为 `props.children` 传入
const Container = (props) => {
    return (
        <div>{props.children}</div>
    );
};

const routes = (state) => {
    function loginRequireAuth() {
        return state.isLogin;
    }
    return (
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="/login" component={Login} onEnter={loginRequireAuth}/>
            <Route path="/qr" component={Qr} onEnter={!loginRequireAuth}/>
        </Route>
    )
};

//const routes = (
//    <Route path="/" component={App}>
//        <IndexRoute component={Home} />
//        <Route path="/login" component={Login}/>
//        <Route path="/qr" component={Qr} />
//    </Route>
//);

export default routes;