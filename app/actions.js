import 'whatwg-fetch';


export const type = {
    FETCH_WORDS: 'FETCH_WORDS',
    FETCH_WORDS_SUCCESS: 'FETCH_WORDS_SUCCESS',
    ADD_WORD: 'ADD_WORD',
    EDIT_WORD: 'EDIT_WORD',
    DELETE_WORD: 'DELETE_WORD',

    SET_EDITABLE_WORD: 'SET_EDITABLE_WORD',
    UNSET_EDITABLE_WORD: 'UNSET_EDITABLE_WORD',
    TOGGLE_EDIT_MODE: 'TOGGLE_EDIT_MODE'
};
    

let nextWordId = 1;

export const fetchWords = () => {
    return {
        type: type.FETCH_WORDS,
        payload: fetch('http://1.lobarev.com/api/words')
    }
};

export const fetchWordsSuccess = (words) => {
    const max = Math.max( ...Object.keys(words) );
    nextWordId = max + 1;
    return {
        type: type.FETCH_WORDS_SUCCESS,
        payload: words
    }
};

export const addWord = (text_en, text_ru) => ({
    type: type.ADD_WORD,
    id: nextWordId++,
    text_en,
    text_ru
});

export const editWord = (id, text_en, text_ru) => ({
    type: type.EDIT_WORD,
    id,
    text_en,
    text_ru
});

export const deleteWord = id => ({
    type: type.DELETE_WORD,
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
