/**
 * Created by zjy on 16-2-19.
 */
import fetch from 'isomorphic-fetch'

//登录
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_RECEIVE = 'LOGIN_RECEIVE';

export function action_login ( user ) {
    return (dispatch, getState) => {
        if(should_login(getState(), user)) {
            return dispatch(fetch_login(user))
        }
    }
}

function login_request ( user ) {
    return {
        type: LOGIN_REQUEST,
        user
    }
}

function login_receive ( user, json ) {
    return {
        type: LOGIN_RECEIVE,
        user,
        isLogin: json.status
    }
}

function fetch_login (user) {
    return dispatch => {
        dispatch(login_request( user));
        return fetch(`http://localhost:3000/users/login?username=${user.username}&password=${user.password}`, {
            credentials: 'same-origin'
        })
        .then( response => response.json())
        .then( json => dispatch( login_receive( user, json )))
    }
}

function should_login (state) {
    return !state.login.isLogin && !state.login.isLogining
}

//登出
export const LOGOUT = 'LOGOUT';

export function action_logout() {
    return (dispatch) => dispatch(fetch_logout())
}
function logout_result() {
    return{
        type: LOGOUT
    }
}

function fetch_logout () {
    return dispatch => {
        return fetch(`http://localhost:3000/users/logout`, {
            credentials: 'same-origin'
        })
        .then( response => response.json())
        .then(
            json => {
                if(json.status)
                return dispatch(logout_result())
            }
        )
    }
}

//二维码请求
export const QR_REQUEST = 'QR_REQUEST';
export const QR_RECEIVE = 'QR_RECEIVE';

export function qr (code) {
    return (dispatch, getState) => {
        return dispatch(fetch_qr(code))
    }
}

function qr_request(code){
    return{
        type:QR_REQUEST,
    }
}

function qr_receive(json){
    console.log(json)
    return{
        type:QR_RECEIVE,
        img: json.img
    }
}

function fetch_qr(code){
    return dispatch => {
        dispatch(qr_request());
        return fetch(`http://localhost:3000/users/qr?code=${code}`)
        .then( response => response.json())
        .then( json => dispatch( qr_receive(json) ) )
    }
}