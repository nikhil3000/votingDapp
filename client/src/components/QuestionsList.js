import React from 'react';
import axios from 'axios';
import Web3 from 'web3';
import config from '../../config'
import { Connect } from 'uport-connect';
// this.props.history.push('/form2');


export default class QuestionsList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: undefined
        }
    }
    componentDidMount() {
        var obj = {
            questionsAddress: undefined,
            question: undefined
        }
        var data = [];
        const ethAddress = '0xB42E70a3c6dd57003f4bFe7B06E370d21CDA8087';
        this.props.factoryContractUport.methods.getPollSize().call({ from: ethAddress }, async (err, num) => {
            num = 1;
            if (!err) {
                console.log(num);
                for (var i = 0; i < num; i++) {
                    var address = await this.props.factoryContractUport.methods.getPollAddList(i).call({ from: ethAddress })
                    console.log(address);
                    obj.questionsAddress = address;
                    data.push(obj);
                }
                console.log(data);
                for (var i = 0; i < num; i++) {
                    const pollContractUport = new this.props.web3.eth.Contract(JSON.parse(config.abi.pollABI), data[i].questionsAddress);
                    var question = await pollContractUport.methods.getQuestion().call({ from: ethAddress })
                    console.log(question);
                    data[i].question = question;
                }
                console.log(data);
                this.setState({ data: data });

            }
        })
    }

    handleClick(address, e) {
        this.props.history.push('/poll/' + address);
    }

    render() {
        return (
            <div style={{ marginLeft: '25%' }} className="main">
                <div className="card" style={{marginTop:'3%',marginBottom:'4%'}}>
                    <div className="card-header orange" style={{ background: '#0d0f1b' }}>
                        <span>Polls</span>
                    </div>
                    
                    <table className="table-div table table-striped" cellSpacing="0">
                        <thead>
                            {/* <tr>
                                <th style={{fontSize:'15px',align:'left'}}>Questions</th>
                                <th>  </th>
                            </tr> */}
                        </thead>
                        <tbody>
                            {
                                this.state.data && this.state.data.map((data, index) => (
                                    <tr key={index}>
                                        <td>{data.question}</td>
                                        {/* <td>{data.count}</td> */}
                                        <td className="action-btn" onClick={(e) => this.handleClick(data.questionsAddress, e)}>Vote</td>
                                    </tr>
                                )
                                )
                            }
                        </tbody>
                    </table>

                </div>

            </div>
        )
    }
}