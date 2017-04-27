import { config } from './config';
import { store } from '../store';
import * as actionCreators from './actions';

export const isLogged = () => {
    let token = store.getState().auth.token;

    if (!token) {
        token = localStorage.getItem(config.TOKEN_KEY);
        store.dispatch(actionCreators.updateToken(token));
    }

    return !!token;
};