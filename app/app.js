import { h, Component } from 'preact';
import { bindActionCreators } from 'redux';


import { store } from './store';
import * as actionCreators from './words/actions';
import * as selectors from './words/selector';
import * as authSelectors from './auth/selector';

import { WordForm } from './words/wordForm';
import { WordsList } from './words/wordList';


export class App extends Component {
    constructor() {
        super();

        this.setState(selectors.get());

        store.subscribe(() => {
            this.setState(selectors.get());
        });

        this.boundActionCreators = bindActionCreators(actionCreators, store.dispatch);
    }

    componentDidMount() {
        this.user = authSelectors.getUser();
        this.boundActionCreators.get(this.user.id);
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.isLoading) {
            return;
        }

        let id = +event.target.elements.id.value;
        let text_en = event.target.elements.text_en.value;
        let text_ru = event.target.elements.text_ru.value;

        if (!text_en || !text_ru) {
            return;
        }

        if (id) {
            this.boundActionCreators.editWord(id, text_en, text_ru);
        } else {
            this.boundActionCreators.addWord(text_en, text_ru, this.user.id);
        }

        event.target.reset();
    }

    handleSetEditableWord(id) {
        if (this.state.isLoading || !this.state.editMode) {
            return;
        }

        let word = this.state.items[id];

        if (word) {
            this.boundActionCreators.setEditableWord(word.id, word.text_en, word.text_ru);
        }
    }

    handleDelete(id) {
        if (this.state.isLoading) {
            return;
        }

        this.boundActionCreators.deleteWord(id);

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
                    { this.state.editMode
                        ? <button className="header-edit icon-close" onClick={this.toggleEditMode.bind(this)}></button>
                        : <button className="header-edit icon-pencil-alt" onClick={this.toggleEditMode.bind(this)}></button> }
                    <button className="header-settings icon-gear" onClick={props.router.navigate.bind(this, '/settings')}></button>
                    { this.state.isLoading ? <div className="header-loading" >Loading...</div> : '' }
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