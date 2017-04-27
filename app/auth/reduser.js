import * as actionTypes from './actionTypes';

export const initialState = {
    token: null,
    user: {
        id: null,
    },
};


export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_TOKEN:
            return {
                ...state,
                token: action.token
            };
        default:
            return state;
    }
};