import { h, Component } from 'preact';

export class WordsList extends Component {

    render(props, state) {
        let listItems = Object.keys(props.words).sort((a, b) => b - a).map((id) => {
            let word = props.words[id];
            let className = 'wordsList-item' + (props.editableWord.id && props.editableWord.id === +id ? ' is-editable' : '');
            return (
                <li className={className} onClick={ props.handleSetEditableWord.bind(null, word.id) }>
                    <span className="item-col">{word.text_en}</span>
                    <span className="item-col">{word.text_ru}</span>
                    <span className="item-controls">
                        <button onClick={ props.handleDelete.bind(null, word.id) } className="wordsList-handle">×</button>
                    </span>
                </li>
            );
        });
        return(
            <div className="app-wordsList">
                <ul>
                    {listItems}
                </ul>
            </div>
        );
    }
}