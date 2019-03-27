import React from 'react';
import axios from 'axios';
import Web3 from 'web3';
import config from '../../config'


export default class QuestionsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: undefined
        }
    }
    componentDidMount() {
    //     axios('http://localhost:5000/getdata',{
    //         method: "get",
    // }).then(response => {
    //     console.log(response);
    //     this.setState({
    //         data: response.data,
    //     })
    //console.log(process.env.infura);
    //web3 = new Web3(new Web3.providers.HttpProvider("rinkeby.infura.io/v3/6b455d8a8338421b8e0e2db7d3264419"));
    web3 = new Web3(new Web3.providers.WebsocketProvider("wss://rinkeby.infura.io/v3/6b455d8a8338421b8e0e2db7d3264419 "));
    const myContract = new web3.eth.Contract(config.abi.factoryABI, config.contractAddresses.voterFactoryAddress);
    // const subscription = web3.eth.subscribe(PrintPollAddList, function(error, result){
    //     if (!error)
    //         console.log("subs"+result);
    // });
    myContract.events.PrintPollAddList(function(error, result){
        if(!error)
            console.log("Listen"+result);
    });
    


    }
    
    render () {
        return (
            <div>            
            <table className="table table-striped">
            <thead>
            <tr>
            <th>S.No</th>
            <th>Question</th>
            <th>Count</th>
            </tr>
            </thead>
            <tbody>
    {
    this.state.data && this.state.data.map ((data,index) =>(
        <tr>
        <td>{index+1}</td>
        <td>{data.question}</td>
        <td>{data.count}</td>
        <td><button className="btn btn-primary">Vote</button></td>
      </tr>
    )
    ) 
    }
    </tbody>
  </table>
            </div>
        )
    }
}