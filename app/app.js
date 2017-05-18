import { h, Component } from 'preact';
import { bindActionCreators } from 'redux';


import { store } from './store';
import { dispatch } from './helpers/dispatch';
import * as actionCreators from './words/actions';
import * as selectors from './words/selector';

import { WordForm } from './words/wordForm';
import { WordsList } from './words/wordList';
import { Logout } from './auth/logout';


export class App extends Component {
    constructor() {
        super();

        //this.state = selectors.get();
        this.setState(selectors.get());

        store.subscribe(() => {
            this.setState(selectors.get());
            console.log(this.state)
        });

        this.boundActionCreators = bindActionCreators(actionCreators, store.dispatch);
    }

    componentDidMount() {
        this.boundActionCreators.get();
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.isFetching) {
            return;
        }

        let id = +event.target.elements.id.value;
        let text_en = event.target.elements.text_en.value;
        let text_ru = event.target.elements.text_ru.value;

        if (!text_en || !text_ru) {
            return;
        }

        if (id) {
            dispatch(actionCreators.editWord(id, text_en, text_ru), this)
                .then(response => {
                    return response.json();
                })
                .then(result => {
                    dispatch(actionCreators.editWordSuccess(id), this);
                    dispatch(actionCreators.unsetEditableWord(), this);
                });
        } else {
            dispatch(actionCreators.addWord(text_en, text_ru), this)
                .then(response => {
                    return response.json();
                })
                .then(result => {
                    dispatch(actionCreators.addWordSuccess(result.word), this);
                });
        }

        event.target.reset();
    }

    handleSetEditableWord(id) {
        if (this.state.isFetching) {
            return;
        }

        let word = this.state.items[id];

        if (word) {
            this.boundActionCreators.setEditableWord(word.id, word.text_en, word.text_ru);
        }
    }

    handleDelete(id) {
        if (this.state.isDeleting) {
            return;
        }

        dispatch(actionCreators.deleteWord(id), this)
            .then(response => {
                return response.json();
            })
            .then(result => {
                dispatch(actionCreators.deleteWordSuccess(id), this);
            });

        if (id === this.state.editableWord.id) {
            this.boundActionCreators.unsetEditableWord();
        }
    }

    toggleEditMode() {
        this.boundActionCreators.toggleEditMode();
        if (this.state.editableWord.id) {
            this.boundActionCreators.unsetEditableWord();
        }
    }

    render(props, { items, editableWord }) {
        return(
            <div id="wordsApp" className={this.state.editMode ? 'is-editMode' : ''}>
                <div className="app-header">
                    <div className="header-title">Words</div>
                    <button className="header-edit" onClick={this.toggleEditMode.bind(this)}>Edit</button>
                    <Logout router={ props.router } />
                </div>


                <WordForm
                    handleSubmit={ this.handleSubmit.bind(this) }
                    word={ editableWord }
                />
                <WordsList
                    words={ items }
                    editableWord={ editableWord }
                    handleDelete={ this.handleDelete.bind(this) }
                    handleSetEditableWord={ this.handleSetEditableWord.bind(this) }
                />
            </div>
        );
    }
}


/*const connect = (component) => {
    console.log(component);
};

connect(App);*/






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
