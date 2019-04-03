import React from 'react';
import hash from 'object-hash';

export default class SubmitVote extends React.Component {

    constructor(props) {
        super(props);
        this.submitVote = this.submitVote.bind(this);

    }

    submitVote(e) {

        e.preventDefault();
        var passkey = $("#passKey")[0].value;
        var email = $("#email")[0].value;
        var number = $("#mobile")[0].value;
        console.log(email);
        if (number && email) {
            var preHash = number.toString() + email.toString() + passkey.toString();
            var hashedString = hash(preHash);
            const data = this.props.data.split("&");
            console.log(data);
            const pollAbi = [{ "constant": false, "inputs": [{ "name": "ind", "type": "uint256" }, { "name": "voterHash", "type": "string" }], "name": "vote", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "voterHash", "type": "string" }], "name": "checkParams", "outputs": [{ "name": "", "type": "bool" }, { "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "numberOfOptions", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "ind", "type": "uint256" }], "name": "getOptions", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_option", "type": "string" }], "name": "addOptions", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getQuestion", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "ind", "type": "uint256" }], "name": "getVotes", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [{ "name": "_question", "type": "string" }, { "name": "_store", "type": "address" }], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }];
            const pollContractUport = new this.props.web3.eth.Contract(pollAbi, data[0]);
            var len;
            //const ethAddress = '0xB42E70a3c6dd57003f4bFe7B06E370d21CDA8087';
            this.props.web3.eth.getAccounts((err, address) => {
                console.log(address[0]);
                console.log('get account callback');
                pollContractUport.methods.vote(data[1], hashedString)
                    .send({ from: address[0] }, (err, hash) => {
                        console.log(hash);

                    })
            })

        }
    }

    render() {
        return (
            <div className="main">
                <div className="card" style={{ marginTop: '3%' }}>
                    <div className="card-header blue">
                        <span>Confirm Vote</span>
                    </div>
                    <form>
                        <div className="form-group">
                            <div htmlFor="email" className="peacockColor">Email</div>
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-5">
                                        <input type="text" className="form-control" name="email" id="email" placeholder="Enter your email"></input>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone" className="peacockColor">Mobile number<i style={{ fontWeight: 400 }}>(with country code)</i>
                            </label>
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-5">
                                        <input type="text" className="form-control" name="mobile" id="mobile" placeholder="Enter your Mobile Number"></input>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone" className="peacockColor">PassKey</label>
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-5">
                                        <input type="text" className="form-control" name="passkey" id="passKey" placeholder="Enter your secret key"></input>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-10"></div>
                                    <div className="col-sm-2">
                                        <button className="btn-hollow" onClick={this.submitVote}>Register</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
{/* <input type="text" class="form-control otp" name="otp" placeholder="Check your inbox for OTP"></input> */ }



