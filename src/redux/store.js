import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import {formReducer} from './reducers/formReducers';

const rootreducers=combineReducers({formReducer})
export const store=createStore(rootreducers,composeWithDevTools(applyMiddleware(thunk)));
