import * as actionTypes from './actionTypes';

export const initialState = {
    token: null,
    user: {
        id: null,
        name: null,
        email: null,
        avatar: null
    },
};


export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_TOKEN:
            return {
                ...state,
                token: action.token
            };
        case actionTypes.SET_USER_DATA:
            return {
                ...state,
                user: {
                    ...action.payload
                }
            };
        default:
            return state;
    }
};