import { h, Component } from 'preact';
import { WordSwipe } from './wordSwipe';

export class WordsList extends Component {

    render(props, state) {
        const listItems = Object.keys(props.words).sort((a, b) => b - a).map((id) => {
            let word = props.words[id];
            return(
                <div className="wordsList-itemHolder">
                    <WordSwipe
                        children={<div className="wordsList-item"><span className="item-col">{word.text_en}</span><span className="item-col">{word.text_ru}</span></div>}
                        buttons={[
                            {text: 'Edit', onPress: props.handleSetEditableWord.bind(null, word.id), className: 'swipe-edit'},
                            {text: 'Delete', onPress: props.handleDelete.bind(null, word.id), className: 'swipe-delete'},
                        ]}
                    />
                </div>
            );
        });
        return(
            <div className="app-wordsList">
                {listItems}
            </div>
        );
    };
}