import React from 'react';
import { Route, Switch } from "react-router-dom";
import { Router } from "react-router-dom";
import App from './App';
import Poll from './Poll';
import Register from './Register';
import SubmitVote from './SubmitVote';
import QuestionsList from './QuestionsList';
import createHistory from 'history/createBrowserHistory';
import Web3Test from './web3';
import { root } from 'postcss';
import Web3 from 'web3';
import config from '../../config'
import PageNotFound from './PageNotFound';
import { Connect } from 'uport-connect';
export const history = createHistory();


export default class Routers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            factoryContractUport: undefined,
            web3: undefined
        }
    }
    componentWillMount() {
        var rpcURL = 'https://rinkeby.infura.io/v3/6b455d8a8338421b8e0e2db7d3264419';

        const connect = new Connect('VotingDapp', {
            network: {
                id: 4,
                rpcUrl: rpcURL
            }
        }
        )
        const provider = connect.getProvider();
        let web3js;
        if (web3) {
            web3js = new Web3(web3.currentProvider);
        }
        else {
            web3js = new Web3(provider);
        }
        console.log(web3js);
        this.setState({ web3: web3js });
        const factoryContractUport = new web3js.eth.Contract(JSON.parse(config.abi.factoryABI), config.contractAddresses.voterFactoryAddress);
        this.setState({ factoryContractUport: factoryContractUport });
    }
    render() {
        return (
            <div>
                <Router history={history}>
                    <Switch>
                        <Route path="/" component={App} exact={true} />
                        <Route path="/poll/:address" component={Poll} />
                        <Route path="/register" render={() => <Register history={history} factoryContractUport={this.state.factoryContractUport} />} />
                        <Route path="/submitVote" component={SubmitVote} />
                        <Route path="/web3" component={Web3Test} />
                        <Route path="/questionslist" render={() => <QuestionsList history={history} factoryContractUport={this.state.factoryContractUport} web3={this.state.web3} />} />
                        <Route component={PageNotFound}/>
                    </Switch>
                </Router>
            </div>
        );
        
    }
}