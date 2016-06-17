var express = require('express');
var router = express.Router();

import React from 'react';
import { renderToString } from 'react-dom/server';
import { RouterContext, match , browserHistory} from 'react-router';
import { Provider } from 'react-redux';
import { combineReducers } from 'redux'
import routes from '../views/react/routes';
import configureStore from '../views/react/store';
import { LOGIN_RECEIVE } from '../views/react/actions'
import reducers from '../views/react/reducers'

//function renderFullPage(html, initialState) {
//    return `
//    <!DOCTYPE html>
//    <html lang="en">
//    <head>
//      <meta charset="UTF-8">
//    </head>
//    <body>
//      <div id="root">
//        <div>
//          ${html}
//        </div>
//      </div>
//      <script>
//        window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
//      </script>
//      <script src="http://localhost:3009/bundle.js"></script>
//    </body>
//    </html>
//  `;
//}

router.get('/*', function (req, res, next) {

    const store = configureStore(reducers);
    console.log(req.session);

    function loginManage(){
        if(req.session.username){
            store.dispatch({
                type:LOGIN_RECEIVE,
                user: {
                    username: req.session.username
                },
                isLogin: true
            })
        }
    }

    match({routes: routes(store.getState()), location: req.url}, (err, redirectLocation, renderProps) => {
        if (err) {
            res.status(500).end(`Internal Server Error ${err}`);
        } else if (redirectLocation) {
            res.redirect(redirectLocation.pathname + redirectLocation.search);
        } else if (renderProps) {

            Promise.all([
                    loginManage()
                ])
                .then(() => {
                    const html = renderToString(
                        <Provider store={store}>
                            <RouterContext {...renderProps} />
                        </Provider>
                    );
                    //res.end(renderFullPage(html, store.getState()));
                    res.render('index', {
                        __html__: html,
                        __state__: JSON.stringify(store.getState())
                    })
                });
        } else {
            res.status(404).end('Not found');
        }
    });
});

module.exports = router;
