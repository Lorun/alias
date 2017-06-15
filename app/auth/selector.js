import { store } from '../store';

export const get = () => store.getState().auth;
export const getUser = () => store.getState().auth.user;
export const getToken = () => store.getState().auth.token;