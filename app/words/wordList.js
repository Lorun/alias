import { h, Component } from 'preact';

export class WordsList extends Component {

    render(props, state) {
        let listItems = Object.keys(props.words).sort((a, b) => b - a).map((id) => {
            let word = props.words[id];
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