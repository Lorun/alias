import { h, Component } from 'preact';

export class WordForm extends Component {
    render(props) {
        return(
            <div className="app-form">
                <form onSubmit={ props.handleSubmit.bind(this) } className="form-holder">
                    <input type="hidden" name="id" value={ props.word.id || '' } />
                    <div className="form-field">
                        <input type="text" name="text_en" value={ props.word.text_en || '' } maxlength="50" placeholder="Phrase" />
                    </div>
                    <div className="form-field">
                        <input type="text" name="text_ru" value={ props.word.text_ru || '' } maxlength="50" placeholder="Translation" />
                    </div>
                    <div className="form-field">
                        <button type="submit" className="form-button">{ props.word.id ? 'Save' : 'Add word' }</button>
                    </div>
                </form>
            </div>
        );
    };
}