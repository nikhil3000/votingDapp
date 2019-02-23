import React from 'react';
import { Route, Switch } from "react-router-dom";
import { Router } from "react-router-dom";
import App from './App';
import Poll from './Poll';
import createHistory from 'history/createBrowserHistory';
export const history = createHistory();


export default class Routers extends React.Component {

    render() {
        return (
            <div>
                <Router history={history}>
                    <Switch>
                        <Route path="/" component={App} exact={true} />
                        <Route path="/poll" component={Poll}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}