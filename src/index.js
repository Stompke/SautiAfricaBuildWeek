import React from 'react';
import { render } from 'react-dom';
import App from './App';
import "./index.css";
import { applyMiddleware, createStore } from "redux";
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import ReactDOM from "react-dom";
import {UserReducer} from './reducers/UserReducer';

const store = createStore(UserReducer, applyMiddleware(logger));


ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
    document.getElementById("root")

); 
