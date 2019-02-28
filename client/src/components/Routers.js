import React from 'react';
import { Route, Switch } from "react-router-dom";
import { Router } from "react-router-dom";
import App from './App';
import Poll from './Poll';
import Register from './Register'; 
import SubmitVote from './SubmitVote';
import QuestionsList from './QuestionsList';
import createHistory from 'history/createBrowserHistory';
import { root } from 'postcss';
export const history = createHistory();


export default class Routers extends React.Component {

    render() {
        return (
            <div>
                <Router history={history}>
                    <Switch>
                        <Route path="/" component={App} exact={true} />
                        <Route path="/poll" component={Poll}/>
                        <Route path="/register" component={Register}/>
                        <Route path="/submitVote" component={SubmitVote}/>
                        <Route path="/questionslist" component={QuestionsList}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}