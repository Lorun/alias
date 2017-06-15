import { h, Component } from 'preact';
import Swipeout from 'rc-swipeout';

export class WordsList extends Component {

    render(props, state) {
        const listItems = Object.keys(props.words).sort((a, b) => b - a).map((id) => {
            let word = props.words[id];
            let className = 'wordsList-item' + (props.editableWord.id && props.editableWord.id === +id ? ' is-editable' : '');
            return(
                <Swipeout
                    onClick={ props.handleSetEditableWord.bind(null, word.id) }
                    right={[
                        {
                            text: 'delete',
                            onPress: props.handleDelete.bind(null, word.id),
                            style: { backgroundColor: 'red', color: 'white' },
                            className: 'custom-class-2'
                        }
                    ]}
                    autoClose
                    children={<div className={className}><span className="item-col">{word.text_en}</span><span className="item-col">{word.text_ru}</span></div>}
                />
            );
        });
        return(
            <div className="app-wordsList">
                {listItems}
            </div>
        );
    };
}