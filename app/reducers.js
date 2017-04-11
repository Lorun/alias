import { combineReducers } from 'redux';
import { type } from './actions';

function words (state = {}, action) {
    switch (action.type) {
        case type.ADD_WORD:
            let nextState = {...state};
            nextState[action.id] = {
                id: action.id,
                text_en: action.text_en,
                text_ru: action.text_ru
            };
            return nextState;
        case type.EDIT_WORD:
            return state.map((word) => {
                if (word.id === action.id) {
                    return Object.assign({}, word, {
                        text_en: action.text_en,
                        text_ru: action.text_ru
                    })
                }
                return word;
            });
        case type.DELETE_WORD:
            return state.filter(word =>
                word.id !== action.id
            );
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