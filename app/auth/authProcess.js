import { h, render, Component } from 'preact';
import { authenticate as facebookAuth } from './facebook';

export class AuthProcess extends Component {

    constructor() {
        super();

        facebookAuth();
    }


    render(props, state) {
        return (
            <div className="app-authenticate">
                Please wait...
            </div>
        );
    }
}