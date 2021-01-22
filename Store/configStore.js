// Store/configureStore.js

import { combineReducers, createStore } from 'redux';
import rootReducer from "./reducers/SearchTripReducer"


export default createStore(rootReducer);
