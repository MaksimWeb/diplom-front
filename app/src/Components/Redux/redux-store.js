import {applyMiddleware, combineReducers, createStore, compose} from "redux";
import thunkMiddleware from "redux-thunk";
import {authReducer} from './auth-reducer';
import {computersReducer} from './computers-reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    // computers: computersReducer
});
const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

let store = createStore(rootReducer, composeEnhances(applyMiddleware(thunkMiddleware)))

export default store;

window.store = store;