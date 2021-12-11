import { createStore, combineReducers } from 'redux';
import songReducer from './reducers';

let store = createStore(songReducer);
export default store;