import 'whatwg-fetch';

import { h, render, Component } from 'preact';
import { config } from './config';

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
                window.location.href = '/';

                const token = localStorage.getItem(config.TOKEN_KEY);

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


export class LoginAuth extends Component {

    constructor() {
        super();

        this.params = this.getQueryParams(window.location.search);

        if(this.params.code) {
            fetch(config.API_ENDPOINT + 'auth/facebook', {
                    method: 'post',
                    body: JSON.stringify({
                        clientId: config.FB_CLIENT_ID,
                        redirectUri: config.FB_REDIRECT_URI,
                        code: this.params.code
                    }),
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                })
                .then(response => response.json())
                .then(response => {
                    if (response.token) {
                        localStorage.setItem(config.TOKEN_KEY, response.token);
                        window.close();
                    }
                });
        }

    }

    getQueryParams(qs) {
        qs = qs.split('+').join(' ');

        let params = {},
            tokens,
            re = /[?&]?([^=]+)=([^&]*)/g;

        while (tokens = re.exec(qs)) {
            params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
        }

        return params;
    }

    render(props, state) {

        //window.close();
        return (
            <div className="app-auth">
                Please wait...
            </div>
        );
    }
}