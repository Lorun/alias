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
        this.boundActionCreators.getUserData(this.token);
    }

    render(props, state) {
        const user = this.state.user;
        return (
            <div id="wordsApp">
                <div className="app-header">
                    <button className="btn header-back icon-arrow-left" onClick={ props.router.navigate.bind(this, '/') }></button>
                    <div className="header-title">Settings</div>
                </div>

                <div className="app-settings">
                    <div className="settings-userInfo">
                        <img src={user.avatar} width="50" height="50" alt=""/>
                        <b>{user.name}</b>
                    </div>

                    <br/>
                    <Logout router={ props.router } />
                </div>
            </div>
        );
    }
}