import {applyMiddleware, combineReducers, createStore, compose} from "redux";
import thunkMiddleware from "redux-thunk";
import {authReducer} from './auth-reducer';
import {adminTestReducer} from "./admin-test-reducer";
import DocsReducer from "./DocsReducer/docs-reducer";

const rootReducer = combineReducers({
    auth: authReducer,
    Test: adminTestReducer,
    docs: DocsReducer
});
const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

let store = createStore(rootReducer, composeEnhances(applyMiddleware(thunkMiddleware)))

export default store;

window.store = store;