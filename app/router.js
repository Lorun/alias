import { h, Component } from 'preact';
import { isLogged } from './auth/index';

import { App } from './App';
import { Login } from './auth/login';
import { AuthProcess } from './auth/authProcess';

const getRoutes = () => {
    const routes = {
        '/login': Login,
        '/login_auth': AuthProcess,
    };

    if (isLogged()) {
        routes['/'] = App;
    } else {
        routes['/'] = Login;
    }

    return routes;
};

export class Router extends Component {
    constructor() {
        super();

        this.updatePath();
    }


    updatePath(path) {
        if (path) {
            window.history.pushState(null,"", path);
        }

        this.setState({
            path: path || window.location.pathname
        });
    }

    render(props, state) {
        const routes = getRoutes();
        const Block = routes[this.state.path];

        if (Block) {
            return (
                <Block router={ {navigate: this.updatePath.bind(this)} } />
            );
        } else {
            return (
                <div className="app-notFound">404 Not found!</div>
            );
        }
    }
}