import { h, render, Component } from 'preact';

import { store, dispatch } from './reducers';
import { fetchWords, fetchWordsSuccess, addWord, addWordSuccess, editWord, editWordSuccess, deleteWord, deleteWordSuccess, setEditableWord, unsetEditableWord, toggleEditMode } from './actions';

import { Login } from './auth/login';
import { Logout } from './auth/logout';
import { AuthProcess } from './auth/authProcess';
import { isLogged } from './auth/index';


class Router extends Component {
    constructor() {
        super();

        this.updatePath();

        this.routes = {
            '/login': Login,
            '/login_auth': AuthProcess,
        };

        if (isLogged()) {
            this.routes['/'] = App;
        } else {
            this.routes['/'] = Login;
        }

    }

    getRoutes() {
        const routes = {
            '/login': Login,
            '/login_auth': AuthProcess,
        };

        if (isLogged()) {
            routes['/'] = App;
        } else {
            routes['/'] = Login;
        }

        return routes;
    }

    updatePath(path) {
        if (path) {
            window.history.pushState(null,"", path);
        }

        this.setState({
            path: path || window.location.pathname
        });
    }

    render(props, state) {
        const routes = this.getRoutes();
        const Block = routes[this.state.path];

        if (Block) {
            return (
                <Block router={ {navigate: this.updatePath.bind(this)} } />
            );
        } else {
            return (
                <div className="app-notFound">404 Not found!</div>
            );
        }
    }
}



class WordsList extends Component {

    render(props, state) {
        let listItems = Object.keys(props.words.items).sort((a, b) => b - a).map((id) => {
            let word = props.words.items[id];
            let className = 'wordsList-item' + (props.editableWord.id && props.editableWord.id === +id ? ' is-editable' : '');
            return (
                <li className={className}>
                    <b>#{word.id}</b> {word.text_en}: {word.text_ru}
                    <button onClick={ props.handleSetEditableWord.bind(null, word.id) } className="wordsList-handle">edit</button>
                    <button onClick={ props.handleDelete.bind(null, word.id) } className="wordsList-handle">×</button>
                </li>
            );
        });
        return(
            <div className="wordsApp-wordsList">
                <ul>
                    {listItems}
                </ul>
                { props.words.isFetching ? <div className="wordsList-loading" >Loading...</div> : '' }
            </div>
        );
    }
}


class WordForm extends Component {
    render(props) {
        return(
            <form onSubmit={ props.handleSubmit.bind(this) } class="wordsApp-form">
                <input type="hidden" name="id" value={ props.word.id || '' } />
                <input type="text" name="text_en" value={ props.word.text_en || '' } maxlength="50" />
                <input type="text" name="text_ru" value={ props.word.text_ru || '' } maxlength="50" />
                <button type="submit">Add</button>
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
            words: {
                isFetching: false,
                isDeleting: false,
                items: {}
            }
        };
    }

    componentDidMount() {
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

    render({}, { words, editableWord, router }) {
        return(
            <div id="wordsApp" className={this.state.editMode ? 'is-editMode' : ''}>
                <h3>Words <button onClick={this.toggleEditMode.bind(this)}>Edit</button></h3>
                <Logout router={ router } />

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



render((
    <Router />
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
