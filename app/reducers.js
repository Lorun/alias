import { combineReducers } from 'redux';
import { ADD_WORD, EDIT_WORD, DELETE_WORD } from './actions';

function words (state = [], action) {
    switch (action.type) {
        case ADD_WORD:
            return [
                ...state,
                {
                    id: action.id,
                    text_en: action.text_en,
                    text_ru: action.text_ru
                }

            ];
        case EDIT_WORD:
            return state.map((word) => {
                if (word.id === action.id) {
                    return Object.assign({}, word, {
                        text_en: action.text_en,
                        text_ru: action.text_ru
                    })
                }
                return word;
            });
        case DELETE_WORD:
            return state.filter(word =>
                word.id !== action.id
            );
        default:
            return state;
    }
}

const wordsApp = combineReducers({
    words
});

export default wordsApp;