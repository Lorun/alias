import { createStore, combineReducers } from 'redux';
import { reducer as authReducer } from './auth/reduser';

const appReducers = combineReducers({
    auth: authReducer
});

export const store = createStore(appReducers);