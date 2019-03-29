import React from 'react';
//import Option from './Option';
import Web3 from 'web3';
import { Connect } from 'uport-connect';

export default class Poll extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            question: undefined
            len: undefined
        }

    }

    componentDidMount() {
        const connect = new Connect('VotingDapp', { network: 'rinkeby' })
        const provider = connect.getProvider()
        const web3 = new Web3(provider);
        const pollAbi =[ { "constant": false, "inputs": [ { "name": "ind", "type": "uint256" }, { "name": "voterHash", "type": "string" } ], "name": "vote", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "numberOfOptions", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "ind", "type": "uint256" } ], "name": "getOptions", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "option", "type": "string" } ], "name": "addOptions", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getQuestion", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [ { "name": "_question", "type": "string" }, { "name": "_store", "type": "address" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" } ];
        const pollContractUport = new web3.eth.Contract(pollAbi,'0x8d69e8312818cceA605e14AA1770dC783b00aE93');        
         var len;
         const ethAddress =  '0xB42E70a3c6dd57003f4bFe7B06E370d21CDA8087'
            pollContractUport.methods.numberOfOptions()
            .call({from:ethAddress},(err,len)=>{
                //console.log(err);
                console.log(len);
                this.setState({
                    len:len
                })
            })
         pollContractUport.methods.getQuestion()
            .call({from:ethAddress},(err,question)=>{
                //console.log(err);
                console.log(question);
                this.setState({
                    question: question
                })
        
            })
}

    render() {
        return  (
            <div>

            <div className="card">
            <div className="card-body">
            {this.state.question}
            {
            for(int i=0;i<this.state.len;i++)
            <ul>
            {
                <div class="radio">
            //     <label><input type="radio" name="optradio" checked>{option}></input></label>
            //     </div>

           
            // this.props.options && this.props.options.map((option, index) => (
            //     <div class="radio">
            //     <label><input type="radio" name="optradio" checked>{option}></input></label>
            //     </div>

            // )) 
            }  

            </ul>
            }             
            </div>
            </div>
            </div>
        )
    }
}