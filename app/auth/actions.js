import 'whatwg-fetch';

import * as actionTypes from './actionTypes';
import { config } from '../config';

export const updateToken = (token, user) => ({
    type: actionTypes.UPDATE_TOKEN,
    token,
    user
});

export const getToken = (code) => ({
    type: actionTypes.GET_TOKEN,
    payload: fetch(config.API_ENDPOINT + 'auth/facebook', {
            method: 'post',
            body: JSON.stringify({
                clientId: config.FB_CLIENT_ID,
                redirectUri: config.FB_REDIRECT_URI,
                code: code
            }),
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        }).then(response => response.json())
});


export const setUserData = (user) => {
    return {
        type: actionTypes.SET_USER_DATA,
        payload: user
    }
};

export const getUserData = (token) => {
    return dispatch => {
        fetch(config.API_ENDPOINT + 'user/show',
            {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(response => response.json())
            .then(response => {
                dispatch(setUserData(response));
            });
    };
};