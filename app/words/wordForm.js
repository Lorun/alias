import { h, Component } from 'preact';

export class WordForm extends Component {
    render(props) {
        return(
            <form onSubmit={ props.handleSubmit.bind(this) } className="app-form">
                <input type="hidden" name="id" value={ props.word.id || '' } />
                <input type="text" name="text_en" value={ props.word.text_en || '' } maxlength="50" placeholder="phrase" />
                <input type="text" name="text_ru" value={ props.word.text_ru || '' } maxlength="50" placeholder="translation" />
                <button type="submit" className="form-button">+</button>
            </form>
        );
    };
}