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
    var  questions= [];
    console.log('abc');
        this.props.factoryContractUport.methods.getPollAddList(0)
        .call({from:"0xc347d452968877f97587B701fba3a3bD29C56663"},(err,obj)=>{
            if(!err)
            console.log(obj);
            else console.log(err);
        })
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