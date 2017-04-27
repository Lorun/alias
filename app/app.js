import { h, Component } from 'preact';

import { store, dispatch } from './reducers';
import { fetchWords, fetchWordsSuccess, addWord, addWordSuccess, editWord, editWordSuccess, deleteWord, deleteWordSuccess, setEditableWord, unsetEditableWord, toggleEditMode } from './actions';


import { WordForm } from './components/wordForm';
import { WordsList } from './components/wordList';
import { Logout } from './auth/logout';


export class App extends Component {
    constructor() {
        super();

        this.state = {
            editMode: false,
            editableWord: {},
            words: {
                isFetching: false,
                isDeleting: false,
                items: {}
            }
        };
    }

    componentDidMount() {
        this.fetchWords();
    }

    fetchWords() {
        dispatch(fetchWords(), this)
            .then(response => {
                return response.json();
            })
            .then(words => {
                dispatch(fetchWordsSuccess(words), this);
            });
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.words.isFetching) {
            return;
        }

        let id = +event.target.elements.id.value;
        let text_en = event.target.elements.text_en.value;
        let text_ru = event.target.elements.text_ru.value;

        if (!text_en || !text_ru) {
            return;
        }

        if (id) {
            dispatch(editWord(id, text_en, text_ru), this)
                .then(response => {
                    return response.json();
                })
                .then(result => {
                    dispatch(editWordSuccess(id), this);
                    dispatch(unsetEditableWord(), this);
                });
        } else {
            dispatch(addWord(text_en, text_ru), this)
                .then(response => {
                    return response.json();
                })
                .then(result => {
                    dispatch(addWordSuccess(result.word), this);
                });
        }

        event.target.reset();
    }

    handleSetEditableWord(id) {
        if (this.state.words.isFetching) {
            return;
        }

        let word = this.state.words.items[id];

        if (word) {
            dispatch(setEditableWord(word.id, word.text_en, word.text_ru), this);
        }
    }

    handleDelete(id) {
        if (this.state.words.isDeleting) {
            return;
        }

        dispatch(deleteWord(id), this)
            .then(response => {
                return response.json();
            })
            .then(result => {
                dispatch(deleteWordSuccess(id), this);
            });

        if (id === this.state.editableWord.id) {
            dispatch(unsetEditableWord(), this);
        }
    }

    toggleEditMode() {
        dispatch(toggleEditMode(), this);
        dispatch(unsetEditableWord(), this);
    }

    render(props, { words, editableWord }) {
        return(
            <div id="wordsApp" className={this.state.editMode ? 'is-editMode' : ''}>
                <h3>Words <button onClick={this.toggleEditMode.bind(this)}>Edit</button></h3>
                <Logout router={ props.router } />

                <WordForm
                    handleSubmit={ this.handleSubmit.bind(this) }
                    word={ editableWord }
                />
                <WordsList
                    words={ words }
                    editableWord={ editableWord }
                    handleDelete={ this.handleDelete.bind(this) }
                    handleSetEditableWord={ this.handleSetEditableWord.bind(this) }
                />
            </div>
        );
    }
}








/*
import { Board, Team } from './board';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';


console.log(Observable);

let board = new Board();
board.draw();

console.log(new Team('Kittens'));


var game = {
    startGame: () => {
        console.log('Game started');
        //this.onNext('startGame');
    },
    onNext: (type) => {

    }
};

var start = new Subject();



var tick = Observable.from( start );
tick.subscribe(game.startGame);

start.subscribe(() => console.log('Sub 1'));
start.subscribe(() => console.log('Sub 2'));
start.subscribe(() => console.log('Sub 5'));

start.next();*/
