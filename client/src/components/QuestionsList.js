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