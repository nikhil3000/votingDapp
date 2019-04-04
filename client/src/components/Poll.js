import React from 'react';



export default class Poll extends React.Component {
    constructor(props) {
        super(props);
        this.addOption = this.addOption.bind(this);
        this.state = {
            question: undefined,
            options: undefined,
            votes: undefined,
            pollContractUport: undefined
        }


    }

    componentDidMount() {
        const pollAbi = [{ "constant": false, "inputs": [{ "name": "ind", "type": "uint256" }, { "name": "voterHash", "type": "string" }], "name": "vote", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "voterHash", "type": "string" }], "name": "checkParams", "outputs": [{ "name": "", "type": "bool" }, { "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "numberOfOptions", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "ind", "type": "uint256" }], "name": "getOptions", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_option", "type": "string" }], "name": "addOptions", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getQuestion", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "ind", "type": "uint256" }], "name": "getVotes", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [{ "name": "_question", "type": "string" }, { "name": "_store", "type": "address" }], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }];
        const pollContractUport = new this.props.web3.eth.Contract(pollAbi, this.props.address);
        this.setState ({
            pollContractUport: pollContractUport
        })
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
                            // console.log(len);
                        }
                        var options = [];
                        var votes = [];
                        for (var i = 0; i < len; i++) {
                            var option = await pollContractUport.methods.getOptions(i).call({ from: ethAddress })
                            // console.log(option);
                            options.push(option);
                            this.setState({
                                options: options
                            })
                            var vote = await pollContractUport.methods.getVotes(i).call({ from: ethAddress })
                            // console.log(vote);
                            votes.push(vote);
                            this.setState({
                                votes: votes
                            })


                        }
                    })

            })


    }


    handleClick(address, index, e) {
        this.props.history.push('/submitVote/' + address + '&' + index);
    }

    addOption(e) {
        e.preventDefault();
        var option = $("#option")[0].value;
        console.log('opt;',option);
        this.props.web3.eth.getAccounts((err, address) => {
            //console.log(address[0]);
            console.log('get account callback');
            this.state.pollContractUport.methods.addOptions(option)
                .send({ from: address[0] }, (err, hash) => {
                    console.log(hash);

                })
        })
    }

    render() {
        return (
            <div>
                <div style={{ marginLeft: '25%' }} className="main">
                    <div className="card" style={{ marginTop: '3%', marginBottom: '4%' }}>
                        <div className="card-header orange" style={{ background: '#0d0f1b' }}>
                            <span>Some suitable heading</span>
                        </div>

                        <table className="table-div table table-striped" cellSpacing="0">
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td style={{fontSize: '15px', paddingLeft: '2px'}}>{this.state.question}</td>

                                </tr>


                                {
                                    this.state.options && this.state.options.map((option, index) => (
                                        <tr key={index}>
                                            <td style={{width:'15px', padding: '15px 7px'}}>{index + 1})</td>
                                            <td style={{paddingLeft: '2px'}}>{option}</td>
                                            <td className="action-btn" onClick={(e) => this.handleClick(this.props.address, index, e)}>Vote</td>
                                        </tr>
                                    )
                                    )
                                }
                            </tbody>
                        </table>
                        <form>
                        <div className="row">
                        <div className="col-sm-8">
                            <input type="text" className="form-control" name="option" id="option" placeholder="Add option"></input>
                            </div>
                            <div className="col-sm-2">
                            <button className="btn-hollow-orange" onClick={this.addOption}>Add</button>
                            </div>
                            
                            </div>
                        </form>

                    </div>

                </div>

            </div>
        )
    }
}