/**
 * Created by zjy on 16-2-19.
 */
import { combineReducers } from 'redux'


import login from './login'
import qr from './qr'

const reducer = combineReducers({
    login:login,
    qr:qr
    //routing: routeReducer
});

export default reducer;