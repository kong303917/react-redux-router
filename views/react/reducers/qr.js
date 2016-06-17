/**
 * Created by zjy on 16-2-21.
 */
import { QR_REQUEST, QR_RECEIVE } from '../actions'
//import Auth from '../auth/auth'
export default function qr (state = {
    img: null,
    isFetching: false
}, action) {
    switch (action.type) {
        case QR_REQUEST:
        case QR_RECEIVE:
            return posts(state, action);
        default:
            return state;
    }
}

function posts ( state , action ) {
    switch (action.type){
        case QR_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
            });
        case QR_RECEIVE:
            return Object.assign({}, state, {
                isFetching: false,
                img: action.img
            });
        default:
            return state;
    }
}