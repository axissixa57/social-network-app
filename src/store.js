import { createStore, combineReducers, compose } from 'redux';

import { todos } from './reducers/todos';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers();

const rootReducer = combineReducers({ todos });

const store = createStore(rootReducer, enhancer);

export default store;