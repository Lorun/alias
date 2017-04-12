import { h, render, Component } from 'preact';

import { createStore } from 'redux';
import { wordsApp } from './reducers';
import { addWord, editWord, deleteWord, setEditableWord, unsetEditableWord } from './actions';


let store = createStore(wordsApp);


class WordsList extends Component {

    render(props, state) {
        let listItems = Object.keys(props.words).sort((a, b) => b - a).map((id) => {
            let word = props.words[id];
            return (
                <li>
                    <b>#{word.id}</b> {word.text_en}: {word.text_ru}
                    <button onClick={ props.handleDelete.bind(null, word.id) }>×</button>
                    <button onClick={ props.handleSetEditableWord.bind(null, word.id) }>e</button>
                </li>
            );
        });
        return(
            <div class="words">
                <ul>
                    {listItems}
                </ul>
            </div>
        );
    }
}


class WordForm extends Component {
    render(props) {
        return(
            <form onSubmit={ props.handleSubmit.bind(this) } class="wordsApp-form">
                <input type="hidden" name="id" value={ props.word.id || '' } />
                <input type="text" name="text_en" value={ props.word.text_en || '' } />
                <input type="text" name="text_ru" value={ props.word.text_ru || '' } />
                <button type="submit">-></button>
            </form>
        );
    };
}


class App extends Component {
    constructor() {
        super();

        this.state = {
            editMode: false,
            editableWord: {},
            words: []
        };
    }

    componentWillMount() {
        store.dispatch(addWord('incredible', 'невероятный'));
        store.dispatch(addWord('1incredible', 'невероятный'));
        this.setState(store.getState());
        console.log(this.state);
    }

    handleSubmit(event) {
        event.preventDefault();
        let id = +event.target.elements.id.value;
        let text_en = event.target.elements.text_en.value;
        let text_ru = event.target.elements.text_ru.value;

        if (!text_en || !text_ru) {
            return;
        }

        if (id) {
            store.dispatch(editWord(id, text_en, text_ru));
            store.dispatch(unsetEditableWord());
        } else {
            store.dispatch(addWord(text_en, text_ru));
        }

        this.setState(store.getState());

        event.target.reset();
    }

    handleSetEditableWord(id) {
        let word = this.state.words[id];

        if (word) {
            store.dispatch(setEditableWord(word.id, word.text_en, word.text_ru));
            this.setState(store.getState());
        }
    }

    handleDelete(id) {
        store.dispatch(deleteWord(id));
        this.setState(store.getState());
    }

    render({}, { words, editableWord }) {
        return(
            <div id="wordsApp">
                <h3>Words</h3>
                <WordForm
                    handleSubmit={ this.handleSubmit.bind(this) }
                    word={ editableWord }
                />
                <WordsList
                    words={ words }
                    handleDelete={ this.handleDelete.bind(this) }
                    handleSetEditableWord={ this.handleSetEditableWord.bind(this) }
                />
            </div>
        );
    }
}



render((
    <App />
), document.body);






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
