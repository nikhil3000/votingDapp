import React from 'react';
import axios from 'axios';
import Web3 from 'web3';
import config from '../../config'
import { Connect } from 'uport-connect';



export default class QuestionsList extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            questions:undefined
        }
    }
    componentDidMount() {
        var questionsAddress = [];
        var questions = [];
        const ethAddress = '0xB42E70a3c6dd57003f4bFe7B06E370d21CDA8087';
        this.props.factoryContractUport.methods.getPollSize().call({ from: ethAddress }, async (err, num) => {
            if (!err) {
                console.log(num);
                for (var i = 0; i < num; i++) {
                    var address = await this.props.factoryContractUport.methods.getPollAddList(i).call({ from: ethAddress })
                    console.log(address);
                    questionsAddress.push(address);
                }

                for(var i=0;i<num;i++) {
                const pollContractUport = new this.props.web3.eth.Contract(JSON.parse(config.abi.pollABI),questionsAddress[i]);        
                   var question = await pollContractUport.methods.getQuestion().call({from:ethAddress})
                    questions.push(question);
                    console.log(question);
                }
                this.setState({questions:questions});

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
                            this.state.questions && this.state.questions.map((data, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{data}</td>
                                    {/* <td>{data.count}</td> */}
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