import { h, render, Component } from 'preact';
import { config } from '../config';
import { store } from '../store';
import * as actionCreators from './actions';

export class Login extends Component {

    constructor() {
        super();
    }

    fbLogin() {

        this.signinWin = window.open(config.getFbDialogUrl(), "SignIn", "width=780,height=410,toolbar=0,scrollbars=0,status=0,resizable=0,location=0,menuBar=0,left=100,top=100");
        this.signinWin.focus();

        this.checkLogged();
    }

    checkLogged() {
        setTimeout(() => {
            if (this.signinWin.closed) {
                this.props.router.navigate('/');

                const token = localStorage.getItem(config.TOKEN_KEY);
                store.dispatch(actionCreators.updateToken(token));

                if (token && token.split('.').length === 3) {
                    try {
                        const base64Url = token.split('.')[1];
                        const base64 = base64Url.replace('-', '+').replace('_', '/');
                        console.log(window.atob(base64));
                        return JSON.parse(window.atob(base64));
                    } catch (e) {
                        console.log(e);
                    }
                }

            } else {
                this.checkLogged();
            }
        }, 1000);
    }

    render(props, state) {
        return (
            <div className="app-auth">
                <button onClick={ this.fbLogin.bind(this) }>Login with Facebook</button>
            </div>
        );
    }
}