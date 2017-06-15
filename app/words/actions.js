import 'whatwg-fetch';

import * as actionTypes from './actionTypes';
import { config } from '../config';


export const setLoading = () => {
    return {
        type: actionTypes.SET_LOADING
    }
};

export const fetchWords = (words) => {
    return {
        type: actionTypes.FETCH_WORDS,
        payload: words
    }
};

export const pushWord = (word) => ({
    type: actionTypes.PUSH_WORD,
    id: word.id,
    text_en: word.text_en,
    text_ru: word.text_ru
});

export const saveWord = (id, text_en, text_ru) => ({
    type: actionTypes.EDIT_WORD,
    id,
    text_en,
    text_ru
});

export const editWordSuccess = (id) => ({
    type: actionTypes.EDIT_WORD_SUCCESS,
    id
});

export const deleteWordSuccess = id => ({
    type: actionTypes.DELETE_WORD,
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



export const get = (token) => {
    return dispatch => {
        dispatch(setLoading());

        fetch(config.API_ENDPOINT + 'words',
            {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(response => response.json())
            .then(response => {
                dispatch(fetchWords(response));
            });
    };
};


export const editWord = (id, text_en, text_ru, token) => {
    return dispatch => {
        dispatch(saveWord(id, text_en, text_ru));

        fetch(config.API_ENDPOINT + 'words/' +id,
            {
                method: 'PUT',
                body: JSON.stringify({
                    text_en,
                    text_ru
                }),
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(response => response.json())
            .then(response => {
                dispatch(editWordSuccess(id));
                dispatch(unsetEditableWord());
            });
    };
};

export const addWord = (text_en, text_ru, token) => {
    return dispatch => {
        dispatch(setLoading());

        fetch(config.API_ENDPOINT + 'words', {
                method: 'post',
                body: JSON.stringify({
                    text_en,
                    text_ru
                }),
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(response => response.json())
            .then(response => {
                dispatch(pushWord(response.word));
            });
    };
};

export const deleteWord = (id, token) => {
    return dispatch => {
        dispatch(setLoading());

        fetch(config.API_ENDPOINT + 'words/' + id,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(response => response.json())
            .then(response => {
                dispatch(deleteWordSuccess(id));
            });
    };
};


