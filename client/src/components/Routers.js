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
import { Connect } from 'uport-connect';
export const history = createHistory();


export default class Routers extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = {
            factoryContractUport : undefined
        }
    }
    componentWillMount()
    {
        const connect = new Connect('Test Web3', { network: 'rinkeby' })
        const provider = connect.getProvider()
        const web3 = new Web3(provider);
        const factoryContractUport = new web3.eth.Contract(JSON.parse(config.abi.factoryABI),config.contractAddresses.voterFactoryAddress);
        this.setState({factoryContractUport:factoryContractUport});
    }
    render() {
        return (
            <div>
                <Router history={history}>
                    <Switch>
                        <Route path="/" component={App} exact={true} />
                        <Route path="/poll" component={Poll}/>
                        <Route path="/register" render={()=> <Register history={history} factoryContractUport={this.state.factoryContractUport} />} />
                        <Route path="/submitVote" component={SubmitVote}/>
                        <Route path="/web3" component={Web3Test}/> 
                        <Route path="/questionslist" render={()=> <QuestionsList history={history} factoryContractUport={this.state.factoryContractUport} />} />
                    </Switch>
                </Router>
            </div>
        );
    }
}