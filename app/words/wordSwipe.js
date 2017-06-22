import { h, Component } from 'preact';

export class WordSwipe extends Component {

    constructor() {
        super();

        this.setState({
            isOpened: false,
            isAnimated: false
        });

        this.start = {x: 0, y: 0};
        this.deltaX = 0;
        this.controlsWidth = 0;
    }

    componentDidMount() {
    }

    componentWillUnmount() {
        //this.closeControls();
    }

    attachTapDocumentListener() {
        document.body.addEventListener('touchstart', this.closeClick());
    }

    closeClick() {
        return (() => {
            const handlerClick = (ev) => {
                if (ev.target.name !== 'app-swipe-btn') {
                    this.closeControls();
                    document.body.removeEventListener('touchstart', handlerClick);
                }
            };
            return handlerClick;
        })();
    }

    closeControls() {
        const swipeElement = this.base || this.nextBase;
        if (swipeElement.children.length > 0) {
            swipeElement.children[0].style.right = 0;
        }
        this.deltaX = 0;
        this.start.x = 0;
        this.setState({isOpened: false});
    }


    handleTouchStart(ev) {
        if (!this.state.isOpened) {
            this.setState({isAnimated: false});
        }
        this.start.x = this.start.x + ev.touches[0].clientX;
        this.controlsWidth = ev.currentTarget.children[1].offsetWidth;
    }

    handleTouchMove(ev) {
        let rightOffset;

        this.deltaX = this.start.x - ev.touches[0].pageX;
        rightOffset = this.deltaX;

        if (this.deltaX >= 0) {
            if (this.deltaX > this.controlsWidth) {
                rightOffset = this.controlsWidth + (this.deltaX - this.controlsWidth) * Math.tan(0.3);
            }
            ev.currentTarget.children[0].style.right = rightOffset + 'px';
        }
    }

    handleTouchEnd(ev) {
        this.setState({isAnimated: true});
        if (this.deltaX < (this.controlsWidth / 3)) {
            this.closeControls();
        } else {
            if (!this.state.isOpened) {
                this.attachTapDocumentListener();
            }

            this.setState({isOpened: true});
            ev.currentTarget.children[0].style.right = this.controlsWidth + 'px';
            this.start.x = this.controlsWidth;
        }
    }

    handleButtonClick(callback) {
        this.closeControls();
        callback();
    }

    render(props, state) {
        const classes = this.state.isAnimated ? 'swipe is-animated' : 'swipe';
        const buttons = props.buttons.map((btn) => {
            return (
                <button className={'swipe-btn ' + btn.className} onClick={this.handleButtonClick.bind(this, btn.onPress)} name="app-swipe-btn">{btn.text}</button>
            )
        });

        return(
            <div className={classes} onTouchMove={this.handleTouchMove.bind(this)} onTouchStart={this.handleTouchStart.bind(this)} onTouchEnd={this.handleTouchEnd.bind(this)}>
                <div className="swipe-content">{props.children}</div>
                <div className="swipe-controls">
                    { buttons }
                </div>
            </div>
        );
    }
}