import React from 'react';
import { Route, Switch } from "react-router-dom";
import { Router } from "react-router-dom";
import Poll from './Poll';
import Register from './Register';
import SubmitVote from './SubmitVote';
import QuestionsList from './QuestionsList';
import { createBrowserHistory } from 'history';
import Web3 from 'web3';
import config from '../../config'
import PageNotFound from './PageNotFound';
import { Connect } from 'uport-connect';
import NavBar from './NavBar';
import FlashMessage from 'react-flash-message'
export const history = createBrowserHistory();


export default class Routers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            factoryContractUport: undefined,
            web3: undefined,
            fallback:false,
            rinkeby:true
        }
    }

    componentWillMount() {
        if (process.env.NODE_ENV != "development") {
            console.log = function() {}
        }
        var rpcURL = 'https://rinkeby.infura.io/v3/6b455d8a8338421b8e0e2db7d3264419';

        const connect = new Connect('VotingDapp', {
            network: {
                id: '0x4',
                rpcUrl: rpcURL
            }
        })
        const provider = connect.getProvider();
        let web3js;
        try {
            web3js = new Web3(web3.currentProvider);
            web3js.eth.net.getId((err,id)=>{
                if(id!=4)
                {
                    this.setState({rinkeby:false});     
                }
            });

        }
        catch (e) {
            web3js = new Web3(provider);
            this.setState({fallback:true})
            // window.alert('Your browser is not Web3 supported. Falling back to Uport.')
            web3js.eth.getCoinbase((err,address)=>{
                console.log(address);
            })
        }
        // web3js = new Web3(web3.currentProvider || provider);
        console.log(web3js);
        this.setState({ web3: web3js });
        const factoryContractUport = new web3js.eth.Contract(JSON.parse(config.abi.factoryABI), config.contractAddresses.voterFactoryAddress);
        this.setState({ factoryContractUport: factoryContractUport });
    }
    render() {
        return (
            <div>
                {this.state.fallback && <FlashMessage duration={10000}>
                    <strong className="peacockColor" style={{marginLeft:'25%'}}>Web3 not found, falling back to Uport </strong>
                </FlashMessage>
                }
                {!this.state.rinkeby && <FlashMessage duration={10000}>
                    <strong className="peacockColor" style={{marginLeft:'30%'}}>Please switch to Rinkeby Testnet</strong>
                </FlashMessage>
                }
                <NavBar history={history} />
                <Router history={history}>
                    <Switch>
                        <Route path="/" exact={true} render={() => <QuestionsList history={history} factoryContractUport={this.state.factoryContractUport} web3={this.state.web3} />} />
                        <Route path="/poll/:address" render={(props) => <Poll history={history} web3={this.state.web3} address={props.match.params.address} />} />
                        <Route path="/register" render={() => <Register history={history} factoryContractUport={this.state.factoryContractUport} />} />
                        <Route path="/submitVote/:data" render={(props) => <SubmitVote history={history} web3={this.state.web3} data={props.match.params.data} />} />
                        <Route path="/questionslist" render={() => <QuestionsList history={history} factoryContractUport={this.state.factoryContractUport} web3={this.state.web3} />} />
                        <Route component={PageNotFound} />
                    </Switch>
                </Router>
            </div>
        );

    }
}