import { createStore, combineReducers } from 'redux';
import { type } from './actions';

export const initialState = {
    items: {},
    isFetching: false,
    isDeleting: false,
    editableWord: {},
    editMode: false
};

export const reducer = (state = initialState, action) => {

    let nextState;

    switch (action.type) {
        case type.FETCH_WORDS:
            return {
                ...state,
                isFetching: true
            };
        case type.FETCH_WORDS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                items: {
                    ...action.payload
                }
            };
        case type.ADD_WORD:
            return {
                ...state,
                isFetching: true
            };
        case type.ADD_WORD_SUCCESS:
            return {
                ...state,
                isFetching: false,
                items: {
                    ...state.items,
                    [action.id]: {
                        id: action.id,
                        text_en: action.text_en,
                        text_ru: action.text_ru
                    }
                }
            };
        case type.EDIT_WORD:
            return {
                ...state,
                isFetching: true,
                items: {
                    ...state.items,
                    [action.id]: {
                        ...state.items[action.id],
                        text_en: action.text_en,
                        text_ru: action.text_ru
                    }
                }
            };
        case type.EDIT_WORD_SUCCESS:
            if (!state.items[action.id]) {
                return state;
            }
            return {
                ...state,
                isFetching: false
            };
        case type.DELETE_WORD:
            /*Object.assign({}, state, {
                isDeleting: true
            });*/
            return {
                ...state,
                isDeleting: true
            };
        case type.DELETE_WORD_SUCCESS:
            nextState = {
                ...state,
                isDeleting: false
            };
            delete nextState.items[action.id];
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

function editMode(state = false, action) {
    switch (action.type) {
        case type.TOGGLE_EDIT_MODE:
            return !state;
        default:
            return state;
    }
}

const wordsApp = combineReducers({
    words,
    editableWord,
    editMode
});

export const store = createStore(wordsApp);

export const dispatch = (action, component) => {
    const result = store.dispatch(action);
    component.setState(store.getState());

    return result.payload || result;
};