import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from 'redux-thunk';

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
    authReducer: auth
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;