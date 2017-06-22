import { h, Component } from 'preact';
import { bindActionCreators } from 'redux';

import { store } from '../store';
import * as actionCreators from './actions';
import * as selectors from './selector';
import * as authSelectors from '../auth/selector';

export class Word extends Component {

    constructor() {
        super();

        this.boundActionCreators = bindActionCreators(actionCreators, store.dispatch);
        this.token = authSelectors.getToken();
        this.boundActionCreators.get(this.token);

        console.log(selectors.get());
        this.setState(selectors.get());

        store.subscribe(() => {
            this.setState(selectors.get());
        });

    }

    componentDidMount() {

    }

    render(props) {
        const word_id = window.location.hash.slice(1);
        const word = this.state.items[word_id];
        if (!word) return;

        const keys = Object.keys(this.state.items);
        const next_id = keys[keys.indexOf(word_id) - 1];
        const prev_id = keys[keys.indexOf(word_id) + 1];

        return(
            <div id="wordsApp" className="app-word">
                <div className="app-header">
                    <button className="btn header-back icon-arrow-left" onClick={ props.router.navigate.bind(this, '/') }>Words</button>
                    <div className="header-title">Words Learning</div>
                </div>
                <div className="word-container">
                    <div className="word-card">
                        <b>{word.text_en}</b> <br /><br />
                        {word.text_ru}
                    </div>
                    <div className="word-navigation">
                        { prev_id && <button className="btn" onClick={props.router.navigate.bind(this, '/word#'+prev_id)}><span className="icon-arrow-left"></span>Prev</button> }
                        { next_id && <button className="btn" onClick={props.router.navigate.bind(this, '/word#'+next_id)}>Next<span className="icon-arrow-right"></span></button> }
                    </div>
                </div>
            </div>
        );
    };
}