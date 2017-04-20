import 'whatwg-fetch';

const api_url = 'http://1.lobarev.com/api/';

export const type = {
    FETCH_WORDS: 'FETCH_WORDS',
    FETCH_WORDS_SUCCESS: 'FETCH_WORDS_SUCCESS',
    ADD_WORD: 'ADD_WORD',
    ADD_WORD_SUCCESS: 'ADD_WORD_SUCCESS',
    EDIT_WORD: 'EDIT_WORD',
    EDIT_WORD_SUCCESS: 'EDIT_WORD_SUCCESS',
    DELETE_WORD: 'DELETE_WORD',
    DELETE_WORD_SUCCESS: 'DELETE_WORD_SUCCESS',

    SET_EDITABLE_WORD: 'SET_EDITABLE_WORD',
    UNSET_EDITABLE_WORD: 'UNSET_EDITABLE_WORD',
    TOGGLE_EDIT_MODE: 'TOGGLE_EDIT_MODE'
};
    

export const fetchWords = () => {
    return {
        type: type.FETCH_WORDS,
        payload: fetch(api_url + 'words')
    }
};

export const fetchWordsSuccess = (words) => {
    return {
        type: type.FETCH_WORDS_SUCCESS,
        payload: words
    }
};

export const addWord = (text_en, text_ru) => ({
    type: type.ADD_WORD,
    payload: fetch(api_url + 'words', {
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
    type: type.ADD_WORD_SUCCESS,
    id: word.id,
    text_en: word.text_en,
    text_ru: word.text_ru
});

export const editWord = (id, text_en, text_ru) => ({
    type: type.EDIT_WORD,
    id,
    text_en,
    text_ru,
    payload: fetch(api_url + 'words/' + id, {
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
    type: type.EDIT_WORD_SUCCESS,
    id
});

export const deleteWord = (id) => ({
    type: type.DELETE_WORD,
    payload: fetch(api_url + 'words/' + id, {
        method: 'DELETE'
    })
});

export const deleteWordSuccess = id => ({
    type: type.DELETE_WORD_SUCCESS,
    id
});


export const setEditableWord = (id, text_en, text_ru) => ({
    type: type.SET_EDITABLE_WORD,
    id,
    text_en,
    text_ru
});

export const unsetEditableWord = () => ({
    type: type.UNSET_EDITABLE_WORD
});

export const toggleEditMode = () => ({
    type: type.TOGGLE_EDIT_MODE,
});
