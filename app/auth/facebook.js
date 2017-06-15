import { config } from '../config';
import { getQueryParams } from '../helpers/uri';


export const authenticate = () => {
    const params = getQueryParams();

    if(params.code) {
        fetch(config.API_ENDPOINT + 'auth/facebook', {
            method: 'post',
            body: JSON.stringify({
                clientId: config.FB_CLIENT_ID,
                redirectUri: config.FB_REDIRECT_URI,
                code: params.code
            }),
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        })
            .then(response => response.json())
            .then(response => {
                if (response.token) {
                    localStorage.setItem(config.TOKEN_KEY, response.token);
                    //localStorage.setItem(config.USER_KEY, JSON.stringify( {id: 1} ));

                    window.close();
                }
            });
    }
};