
export const ADD_WORD = 'ADD_WORD';
export const EDIT_WORD = 'EDIT_WORD';
export const DELETE_WORD = 'DELETE_WORD';

let nextWordId = 0;


export const addWord = (text_en, text_ru) => ({
    type: ADD_WORD,
    id: nextWordId++,
    text_en,
    text_ru
});

export const editWord = (id, text_en, text_ru) => ({
    type: EDIT_WORD,
    id,
    text_en,
    text_ru
});

export const deleteWord = id => ({
    type: DELETE_WORD,
    id
});
