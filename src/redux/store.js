import {combineReducers, createStore} from "redux";

import profile from "./reducers/profile";
import dialogs from './reducers/dialogs';
import sidebar from "./reducers/sidebar";
import users from "./reducers/users";

const rootReducer = combineReducers({
    profileReducer: profile,
    dialogsReducer: dialogs,
    sidebarReducer: sidebar,
    usersReducer: users,
});

const store = createStore(rootReducer);

export default store;