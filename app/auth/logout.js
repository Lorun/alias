import { h, render, Component } from 'preact';
import { logout } from './index';

export class Logout extends Component {

    constructor() {
        super();
    }

    logout() {
        logout();
        this.props.router.href = '/';
    }

    render(props, state) {
        return (
            <button onClick={ this.logout }>Logout</button>
        );
    }
}