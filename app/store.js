import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { reducer as authReducer } from './auth/reduser';
import { reducer as wordReducer } from './words/reduser';
import { reducer as settingsReducer } from './settings/reduser';

const appReducers = combineReducers({
    auth: authReducer,
    words: wordReducer,
    settings: settingsReducer
});


function logger({ getState }) {
    return (next) => (action) => {
        console.log('will dispatch', action)

        // Call the next dispatch method in the middleware chain.
        let returnValue = next(action)

        console.log('state after dispatch', getState())

        // This will likely be the action itself, unless
        // a middleware further in chain changed it.
        return returnValue
    }
}


export const store = createStore(
    appReducers,
    compose(
        applyMiddleware(thunk),
        //applyMiddleware(logger)
    )
);