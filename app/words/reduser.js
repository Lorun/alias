import * as actionTypes from './actionTypes';

export const initialState = {
    items: {},
    isLoading: false,
    editableWord: {},
    editMode: false
};

export const reducer = (state = initialState, action) => {

    let nextState;

    switch (action.type) {
        case actionTypes.SET_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.FETCH_WORDS:
            return {
                ...state,
                isLoading: false,
                items: {
                    ...action.payload
                }
            };
        case actionTypes.PUSH_WORD:
            return {
                ...state,
                isLoading: false,
                items: {
                    ...state.items,
                    [action.id]: {
                        id: action.id,
                        text_en: action.text_en,
                        text_ru: action.text_ru
                    }
                }
            };
        case actionTypes.EDIT_WORD:
            return {
                ...state,
                isLoading: true,
                items: {
                    ...state.items,
                    [action.id]: {
                        ...state.items[action.id],
                        text_en: action.text_en,
                        text_ru: action.text_ru
                    }
                }
            };
        case actionTypes.EDIT_WORD_SUCCESS:
            if (!state.items[action.id]) {
                return state;
            }
            return {
                ...state,
                isLoading: false
            };
        case actionTypes.DELETE_WORD:
            nextState = {
                ...state,
                isLoading: false
            };
            delete nextState.items[action.id];
            return nextState;

        case actionTypes.SET_EDITABLE_WORD:
            return {
                ...state,
                editableWord: Object.assign({}, state.editableWord, {
                    id: action.id,
                    text_en: action.text_en,
                    text_ru: action.text_ru
                })
            };
        case actionTypes.UNSET_EDITABLE_WORD:
            return {
                ...state,
                editableWord: {}
            };

        case actionTypes.TOGGLE_EDIT_MODE:
            return {
                ...state,
                editMode: !state.editMode
            };
        default:
            return state;
    }
};