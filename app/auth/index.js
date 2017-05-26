import { config } from '../config';
import { store } from '../store';
import * as actionCreators from './actions';

export const isLogged = () => {
    let token = store.getState().auth.token;
    let user = store.getState().auth.user;

    if (!token) {
        token = localStorage.getItem(config.TOKEN_KEY);
        user = JSON.parse(localStorage.getItem(config.USER_KEY));

        store.dispatch(actionCreators.updateToken(token, user));
    }

    return !!token;
};


export const logout = () => {
    localStorage.clear();
    store.dispatch(actionCreators.updateToken(null, null));
};