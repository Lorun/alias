import { combineReducers } from 'redux';
import { type } from './actions';

function words (state = {}, action) {
    switch (action.type) {
        case type.ADD_WORD:
            return {
                ...state,
                [action.id]: {
                    id: action.id,
                    text_en: action.text_en,
                    text_ru: action.text_ru
                }
            };
        case type.EDIT_WORD:
            if (!state[action.id]) {
                return state;
            }
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    text_en: action.text_en,
                    text_ru: action.text_ru
                }
            };
        case type.DELETE_WORD:
            const nextState = { ...state };
            delete nextState[action.id];
            return nextState;
        default:
            return state;
    }
}

function editableWord (state = {}, action) {
    switch (action.type) {
        case type.SET_EDITABLE_WORD:
            return Object.assign({}, state, {
                id: action.id,
                text_en: action.text_en,
                text_ru: action.text_ru
            });
        case type.UNSET_EDITABLE_WORD:
            return {};
        default:
            return state;
    }
}

const wordsApp = combineReducers({
    words,
    editableWord
});

export default wordsApp;