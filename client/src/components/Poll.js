import React from 'react';
//import Option from './Option';
import Web3 from 'web3';
import { Connect } from 'uport-connect';

export default class Poll extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            question: undefined,
            options: undefined,
            votes: undefined
        }


    }

    componentDidMount() {
        const connect = new Connect('VotingDapp', { network: 'rinkeby' })
        const provider = connect.getProvider()
        const web3 = new Web3(provider);
        const pollAbi = [{ "constant": false, "inputs": [{ "name": "ind", "type": "uint256" }, { "name": "voterHash", "type": "string" }], "name": "vote", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "voterHash", "type": "string" }], "name": "checkParams", "outputs": [{ "name": "", "type": "bool" }, { "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "numberOfOptions", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "ind", "type": "uint256" }], "name": "getOptions", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_option", "type": "string" }], "name": "addOptions", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getQuestion", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "ind", "type": "uint256" }], "name": "getVotes", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [{ "name": "_question", "type": "string" }, { "name": "_store", "type": "address" }], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }];
        const pollContractUport = new web3.eth.Contract(pollAbi, this.props.match.params.address);
        var len;
        const ethAddress = '0xB42E70a3c6dd57003f4bFe7B06E370d21CDA8087'

        pollContractUport.methods.getQuestion()
            .call({ from: ethAddress }, (err, question) => {
                //console.log(err);
                console.log(question);
                this.setState({
                    question: question
                })

                pollContractUport.methods.numberOfOptions()
                    .call({ from: ethAddress }, async (err, len) => {
                        //console.log(err);
                        if (!err) {
                            console.log(len);
                        }
                        var options = [];
                        var votes = [];
                        for (var i = 0; i < len; i++) {
                            var option = await pollContractUport.methods.getOptions(i).call({ from: ethAddress })
                            console.log(option);
                            options.push(option);
                            this.setState({
                                options: options
                            })
                            var vote = await pollContractUport.methods.getVotes(i).call({ from: ethAddress })
                            console.log(vote);
                            votes.push(vote);
                            this.setState({
                                votes: votes
                            })
                        }
                    })
            })
    }

    render() {
        return (
            <div>
                <div class="card text-center">
                    <div className="card register">
                        <div className="card-body">
                            {this.state.question}
                            <ul>
                                {
                                    this.state.options && this.state.options.map((option, index) => (
                                        <div key={index} >
                                            <div className="card register">
                                                <div className="card-body">
                                                    <div className="form-group">
                                                        <div className="row">
                                                            <label className="control-label col-sm-2">{option}</label>
                                                            <div className="col-sm-10">
                                                                <div className="btn btn-primary">Vote</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}