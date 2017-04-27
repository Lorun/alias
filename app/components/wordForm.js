import { h, Component } from 'preact';

export class WordForm extends Component {
    render(props) {
        return(
            <form onSubmit={ props.handleSubmit.bind(this) } className="wordsApp-form">
                <input type="hidden" name="id" value={ props.word.id || '' } />
                <input type="text" name="text_en" value={ props.word.text_en || '' } maxlength="50" />
                <input type="text" name="text_ru" value={ props.word.text_ru || '' } maxlength="50" />
                <button type="submit">Add</button>
            </form>
        );
    };
}