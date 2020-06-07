import {applyMiddleware, combineReducers, createStore, compose } from "redux";
import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer} from 'redux-form'

import profile from "./reducers/profile";
import dialogs from './reducers/dialogs';
import sidebar from "./reducers/sidebar";
import users from "./reducers/users";
import auth from "./reducers/auth";
import app from "./reducers/app";

const rootReducer = combineReducers({
    profileReducer: profile,
    dialogsReducer: dialogs,
    sidebarReducer: sidebar,
    usersReducer: users,
    authReducer: auth,
    // обязательный ключ form, т.к. библиотека будет искать его
    form: formReducer,
    appReducer: app
});

type RootReducerType = typeof rootReducer; // (state: AppStateType) => AppStateType - это то что примерно вернёт от typeof rootReducer

export type AppStateType = ReturnType<RootReducerType> // определит что возращает ф-ция от typeof rootReducer и засунет в тип, т.е. объект state

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [thunkMiddleware];

const enhancer = composeEnhancers(applyMiddleware(...middlewares));

const store = createStore(rootReducer, enhancer);

export default store;