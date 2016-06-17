/**
 * Created by zjy on 16-2-19.
 */
import { createSelector } from 'reselect'

const qr = (state) => state.qr;
const login = (state) => state.login;
export default  createSelector(
    [qr,login],
    (qr,login) => {
        return {
            isFetching: qr.isFetching,
            img: qr.img,
            isLogin: login.isLogin
        }
    }
)