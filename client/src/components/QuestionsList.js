import React from 'react';
import config from '../../config'



export default class QuestionsList extends React.Component {
    constructor(props) {
        super(props);
        this.addQuestion = this.addQuestion.bind(this);
        this.state = {
            data: undefined
        }
    }
    componentDidMount() {
        
        var data = [];
        const ethAddress = '0xB42E70a3c6dd57003f4bFe7B06E370d21CDA8087';
        this.props.factoryContractUport.methods.getPollSize().call({ from: ethAddress }, async (err, num) => {
            if (!err) {
                console.log(num);
                for (var i = 0; i < num; i++) {
                    var address = await this.props.factoryContractUport.methods.getPollAddList(i).call({ from: ethAddress })
                    console.log(address);
                    var obj = {
                        questionsAddress: address,
                        question: undefined
                    }
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

    addQuestion(e) {
        e.preventDefault();
        var question = $("#question")[0].value;
        console.log('q;',question);
        this.props.web3.eth.getAccounts((err, address) => {
            //console.log(address[0]);
            console.log('get account callback');
            this.props.factoryContractUport.methods.createPoll(question)
                .send({ from: address[0] }, (err, hash) => {
                    console.log(hash);

                })
        })
    }

    render() {
        return (
            <div style={{ marginLeft: '25%' }} className="main">
                <div className="card" style={{ marginTop: '3%', marginBottom: '4%' }}>
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
                    <div className="form-group">
                        <form>
                        <div className="row">
                        <div className="col-sm-8">
                            <input type="text" className="form-control" name="question" id="question" placeholder="Add question"></input>
                            </div>
                            <div className="col-sm-2">
                            <button className="btn-hollow-orange" onClick={this.addQuestion}>Add</button>
                            </div>
                            
                            </div>
                        </form>
                    </div>

                </div>

            </div>
        )
    }
}