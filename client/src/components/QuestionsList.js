import React from 'react';
import axios from 'axios';
import Web3 from 'web3';
import config from '../../config'
import { Connect } from 'uport-connect';



export default class QuestionsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: undefined
        }
    }
    componentDidMount() {
        var questions = [];
        const ethAddress =  '0xB42E70a3c6dd57003f4bFe7B06E370d21CDA8087'
        this.props.factoryContractUport.methods.getPollSize().call({from:ethAddress},(err,num)=>{
            if(!err)
            {
                console.log(num);
                for(var i=0;i<num;i++)
                {
                    this.props.factoryContractUport.methods.getPollAddList(i).call({from:ethAddress}, (err,num)=>{
                        console.log(err);
                        console.log(num);
                    })
                }
            }
        })
        
    }

    render() {
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
                            this.state.data && this.state.data.map((data, index) => (
                                <tr>
                                    <td>{index + 1}</td>
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