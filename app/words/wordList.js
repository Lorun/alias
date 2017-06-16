import { h, Component } from 'preact';
import Swipeout from 'rc-swipeout';

export class WordsList extends Component {

    render(props, state) {
        const listItems = Object.keys(props.words).sort((a, b) => b - a).map((id) => {
            let word = props.words[id];
            return(
                <Swipeout
                    right={[
                        {
                            text: 'edit',
                            onPress: props.handleSetEditableWord.bind(null, word.id),
                            style: { backgroundColor: '#a0a0a0', color: 'white' }
                        },
                        {
                            text: 'delete',
                            onPress: props.handleDelete.bind(null, word.id),
                            style: { backgroundColor: '#ff3644', color: 'white' }
                        }
                    ]}
                    autoClose
                    children={<div className="wordsList-item"><span className="item-col">{word.text_en}</span><span className="item-col">{word.text_ru}</span></div>}
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