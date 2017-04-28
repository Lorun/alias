import 'whatwg-fetch';

import * as actionTypes from './actionTypes';
import { config } from '../config';


export const fetchWords = () => {
    return {
        type: actionTypes.FETCH_WORDS,
        payload: fetch(config.API_ENDPOINT + 'words')
    }
};

export const fetchWordsSuccess = (words) => {
    return {
        type: actionTypes.FETCH_WORDS_SUCCESS,
        payload: words
    }
};

export const addWord = (text_en, text_ru) => ({
    type: actionTypes.ADD_WORD,
    payload: fetch(config.API_ENDPOINT + 'words', {
        method: 'post',
        body: JSON.stringify({
            text_en,
            text_ru
        }),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    })
});

export const addWordSuccess = (word) => ({
    type: actionTypes.ADD_WORD_SUCCESS,
    id: word.id,
    text_en: word.text_en,
    text_ru: word.text_ru
});

export const editWord = (id, text_en, text_ru) => ({
    type: actionTypes.EDIT_WORD,
    id,
    text_en,
    text_ru,
    payload: fetch(config.API_ENDPOINT + 'words/' + id, {
        method: 'PUT',
        body: JSON.stringify({
            text_en,
            text_ru
        }),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    })
});

export const editWordSuccess = (id) => ({
    type: actionTypes.EDIT_WORD_SUCCESS,
    id
});

export const deleteWord = (id) => ({
    type: actionTypes.DELETE_WORD,
    payload: fetch(config.API_ENDPOINT + 'words/' + id, {
        method: 'DELETE'
    })
});

export const deleteWordSuccess = id => ({
    type: actionTypes.DELETE_WORD_SUCCESS,
    id
});


export const setEditableWord = (id, text_en, text_ru) => ({
    type: actionTypes.SET_EDITABLE_WORD,
    id,
    text_en,
    text_ru
});

export const unsetEditableWord = () => ({
    type: actionTypes.UNSET_EDITABLE_WORD
});

export const toggleEditMode = () => ({
    type: actionTypes.TOGGLE_EDIT_MODE,
});



export const get = () => {
    return dispatch => {
        fetch(config.API_ENDPOINT + 'words')
            .then(response => response.json())
            .then(response => {
                dispatch(fetchWordsSuccess(response));
            });
    };
};



/*export const get = payload =>
    dispatch =>
        api.get(payload)
            .then(response => dispatch(update(response.users)));*/

