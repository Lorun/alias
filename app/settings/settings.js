import { h, render, Component } from 'preact';
import { bindActionCreators } from 'redux';
import { Logout } from '../auth/logout';

import { store } from '../store';
import * as authSelectors from '../auth/selector';
import * as actionCreators from '../auth/actions';

export class Settings extends Component {

    constructor() {
        super();

        this.setState(authSelectors.get());

        store.subscribe(() => {
            this.setState(authSelectors.get());
        });

        this.boundActionCreators = bindActionCreators(actionCreators, store.dispatch);
    }

    componentDidMount() {
        this.token = authSelectors.getToken();
        if (!this.state.user.id) {
            this.boundActionCreators.getUserData(this.token);
        }
    }

    render(props, state) {
        const user = this.state.user;
        const avatar_style = "background-image: url(" + user.avatar + ")";
        return (
            <div id="wordsApp">
                <div className="app-header">
                    <button className="btn header-back icon-arrow-left" onClick={ props.router.navigate.bind(this, '/') }>Words</button>
                    <div className="header-title">Settings</div>
                </div>

                <div className="app-settings">
                    <div className="settings-userInfo">
                        <span className="userInfo-avatar" style={avatar_style}></span>
                        <h3 className="userInfo-name">{user.name}</h3>
                    </div>

                    <br/>
                    <Logout router={ props.router } />
                </div>
            </div>
        );
    }
}