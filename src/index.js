import React from 'react';
import ReactDom from "react-dom";
import {BrowserRouter, HashRouter} from "react-router-dom";
import {Provider} from "react-redux";

import store from './redux/store';
import App from './App';

import './index.css'

ReactDom.render(
    <HashRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </HashRouter>,
    document.getElementById('root')
);