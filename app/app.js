import { h, render, Component } from 'preact';

import { createStore } from 'redux';
import wordsApp from './reducers';
import { addWord, editWord, deleteWord } from './actions';

let store = createStore(wordsApp);



class Words extends Component {

    render(props, state) {
        let listItems = props.words.map((word) =>
            <li><b>#{word.id}</b> {word.text_en}: {word.text_ru} <button onClick={ props.handleDelete.bind(null, word.id) }>x</button></li>
        );
        return(
            <div class="words">
                <ul>
                    {listItems}
                </ul>
            </div>
        );
    }
}


class AddWord extends Component {
    constructor() {
        super();

    }

    render(props, state) {
        //console.log(props.handleSubmit);
        return(
            <form onSubmit={ props.handleSubmit }>
                <input type="text" name="text_en" />
                <input type="text" name="text_ru" />
                <button type="submit">Add</button>
            </form>
        );
    }
}


class App extends Component {
    constructor() {
        super();

        this.state = {
            words: []
        };
    }

    componentWillMount() {
        store.dispatch(addWord('incredible', 'невероятный'));
        this.setState(store.getState());
    }

    handleSubmit(event) {
        event.preventDefault();
        let text_en = event.target.elements.text_en.value;
        let text_ru = event.target.elements.text_ru.value;

        if (!text_en || !text_ru) {
            return;
        }

        store.dispatch(addWord(text_en, text_ru));
        this.setState(store.getState());
        event.target.reset();
    }

    handleDelete(id) {
        store.dispatch(deleteWord(id));
        this.setState(store.getState());
    }

    render({}, { words }) {
        return(
            <div id="wordsApp">
                <h3>Words</h3>
                <AddWord handleSubmit={ this.handleSubmit.bind(this) } />
                <Words words={ words } handleDelete={ this.handleDelete.bind(this) } />
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
