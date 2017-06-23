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

        this.setState(selectors.get());

        store.subscribe(() => {
            this.setState(selectors.get());
        });

    }

    componentDidMount() {

    }


    toggleFlipCard() {
        this.setState({
            ...this.state,
            isFlipped: !this.state.isFlipped
        });
    }

    handleNavigationClick(id) {
        if (this.state.isFlipped) {
            this.toggleFlipCard();
        }
        this.props.router.navigate('/word#'+id);
    }

    render(props) {
        const word_id = window.location.hash.slice(1);
        const word = this.state.items[word_id];
        if (!word) return;

        const keys = Object.keys(this.state.items);
        const next_id = keys[keys.indexOf(word_id) - 1];
        const prev_id = keys[keys.indexOf(word_id) + 1];

        let cardClass = this.state.isFlipped ? 'word-card is-flipped' : 'word-card';

        return(
            <div id="wordsApp" className="app-word">
                <div className="app-header">
                    <button className="btn header-back icon-arrow-left" onClick={ props.router.navigate.bind(this, '/') }>Words</button>
                    <div className="header-title">Words Learning</div>
                </div>
                <div className="word-container">
                    <div className={cardClass} onClick={this.toggleFlipCard.bind(this)}>
                        <div className="card-container">
                            <div className="card-front">
                                <div className="card-lang">en</div>
                                {word.text_en}
                            </div>
                            <div className="card-back">
                                <div className="card-lang">ru</div>
                                {word.text_ru}
                            </div>
                        </div>
                    </div>
                    <div className="word-navigation">
                        { prev_id && <button className="btn btn--big btn--green btn--prev" onClick={this.handleNavigationClick.bind(this, prev_id)}><span className="icon-arrow-left"></span> Prev</button> }
                        { next_id && <button className="btn btn--big btn--green btn--next" onClick={this.handleNavigationClick.bind(this, next_id)}>Next <span className="icon-arrow-right"></span></button> }
                    </div>
                </div>
            </div>
        );
    };
}