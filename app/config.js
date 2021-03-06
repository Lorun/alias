export const config = {

    USER_KEY: 'user',

    TOKEN_KEY: 'auth_token',
    API_ENDPOINT: 'http://1.lobarev.com/api/',

    /* FB Auth Config */
    FB_CLIENT_ID: '1056329071099277',
    FB_REDIRECT_URI: process.env.NODE_ENV == 'production' ? 'http://words.lobarev.com/login_auth' : 'http://local.lobarev.com:8080/login_auth',

    getFbDialogUrl() {
        return 'https://www.facebook.com/v2.5/dialog/oauth?client_id=' + this.FB_CLIENT_ID + '&redirect_uri=' + this.FB_REDIRECT_URI + '&response_type=code&display=popup';
    }

};