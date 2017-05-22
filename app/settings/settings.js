import { h, render, Component } from 'preact';
import { Logout } from '../auth/logout';

export class Settings extends Component {

    constructor() {
        super();
    }

    render(props, state) {
        return (
            <div id="wordsApp">
                <div className="app-header">
                    <button className="btn header-back" onClick={ props.router.navigate.bind(this, '/') }>back</button>
                    <div className="header-title">Settings</div>
                </div>

                <div className="app-settings">
                    <Logout router={ props.router } />
                </div>
            </div>
        );
    }
}