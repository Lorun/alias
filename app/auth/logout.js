import { h, render, Component } from 'preact';
import { logout } from './index';

export class Logout extends Component {

    constructor() {
        super();
    }

    logout() {
        logout();
        this.props.router.navigate('/login');
    }

    render(props, state) {
        return (
            <button className="btn btn--black app-logout" onClick={ this.logout.bind(this) }>Logout</button>
        );
    }
}