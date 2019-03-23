import React from 'react';
import Web3 from 'web3';
import config from '../../config'
import { Connect } from 'uport-connect';

export default class Web3Test extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const connect = new Connect('Test Web3', { network: 'rinkeby' })
        const provider = connect.getProvider()
        const web3 = new Web3(provider)
        const abi = [{ "constant": false, "inputs": [{ "name": "_num", "type": "uint256" }], "name": "setNum", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "constant": true, "inputs": [], "name": "getNum", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }];
        const statusContract = new web3.eth.Contract(JSON.parse(config.abi.factoryABI),config.contractAddresses.voterFactoryAddress);
        statusContract.methods.createPoll("Question uport?").send({from:'0xB42E70a3c6dd57003f4bFe7B06E370d21CDA8087'},(err,hash)=>{
            if(err) {throw err};
            console.log(hash);
        })
    }

    render() {
        return (
            <div>Test</div>
        )
    }
}



// componentDidMount() {
//     let web3;
//     if (web3 && web3.currentProvider) {
//         const factoryContract = web3.eth.contract(JSON.parse(config.abi.factoryABI));
//         const factory = factoryContract.at(config.contractAddresses.voterFactoryAddress);
//         factory.createPoll("Question 1?", function (err, result) {
//             if (!err) {
//                 console.log("poll result", result);
//             }
//             else
//                 console.log(err);
//         });

//         factory.getStorageContract(function (err, result) {
//             if (err)
//                 console.log(err);
//             else {
//                 console.log(result);
//             }
//         });

//     }
//     else {
//         // console.log("metamask web 3 not found fallback to uport");
//         const connect = new Connect('VotingDapp2', { network: 'rinkeby' });

//         // const txObj = {
//         //     address: '0x5942763146abECF6ADC72619eD9b619df8b2412E',
//         //     value: 10000000000  
//         //   }
//         //   connect.sendTransaction(txObj, 'ethSendReq')
//         //   connect.onResponse('ethSendReq').then(res => {
//         //     console.log(res);
//         //   })



//         const provider = connect.getProvider()
//         const web3 = new Web3(provider)
//         const factory = web3.eth.Contract(JSON.parse(config.abi.factoryABI),config.contractAddresses.voterFactoryAddress);
//         // const factory = factoryContract
//         factory.methods.createPoll("Question 1?", function (err, result) {
//             if (!err) {
//                 console.log("poll result", result);
//             }
//             else
//                 console.log(err);
//         });



//         // connect.requestDisclosure();
//         // connect.onResponse('disclosureReq').then(res => {
//         //     console.log(res);
//         //     const did = res.payload.did
//         // })
//         const factory = connect.contract(JSON.parse(config.abi.factoryABI)).at(config.contractAddresses.voterFactoryAddress);
//         const abi = [ { "constant": false, "inputs": [ { "name": "_num", "type": "uint256" } ], "name": "setNum", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "constant": true, "inputs": [], "name": "getNum", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" } ];
//         const statusContract = connect.contract(abi).at("0x5573b56dd293552f449db7482833a68f7b5f9062");
//         statusContract.setNum(5,'id1');
//         connect.onResponse('id1').then(res => {
//             const txId = res.payload
//           })


//         // const reqid = 'createPoll';
//         // console.log(factory);
//         // factory.createPoll('Question 2?', reqid);

//         // connect.onResponse(reqid).then(req => {
//         //     console.log(req);
//         // })
//     }
// }
