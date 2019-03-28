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
        var rpcURL = 'https://rinkeby.infura.io/v3/6b455d8a8338421b8e0e2db7d3264419';

        const connect = new Connect('VotingDapp', { 
                network: {
                    id:4,
                rpcUrl:rpcURL  }}
                    )
        const provider = connect.getProvider();
        const web3 = new Web3(provider);
        const factoryAbi = [ { "constant": true, "inputs": [ { "name": "index", "type": "uint256" } ], "name": "getPollAddList", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "renounceOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "question", "type": "string" } ], "name": "createPoll", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "isOwner", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "hash", "type": "string" } ], "name": "addVoter", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getPollSize", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_store", "type": "address" } ], "name": "setStorageContract", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getStorageContract", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "newOwner", "type": "address" } ], "name": "transferOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "name": "_store", "type": "address" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "previousOwner", "type": "address" }, { "indexed": true, "name": "newOwner", "type": "address" } ], "name": "OwnershipTransferred", "type": "event" } ];
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