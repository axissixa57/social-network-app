import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer} from 'redux-form'

import profile from "./reducers/profile";
import dialogs from './reducers/dialogs';
import sidebar from "./reducers/sidebar";
import users from "./reducers/users";
import auth from "./reducers/auth";

const rootReducer = combineReducers({
    profileReducer: profile,
    dialogsReducer: dialogs,
    sidebarReducer: sidebar,
    usersReducer: users,
    authReducer: auth,
    // обязательный ключ form, т.к. библиотека будет искать его
    form: formReducer
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;
window.store = store;