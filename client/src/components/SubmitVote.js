import React from 'react';


export default class SubmitVote extends React.Component {

    render() {
        return (
            <div className="card register">
                <div className="card-body">
                    <form>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-7">
                                        <input type="text" className="form-control" name="email" placeholder="Enter your email"></input>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Mobile number</label>
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-7">
                                        <input type="text" className="form-control" name="mobile" placeholder="Enter your Mobile Number"></input>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">PassKey</label>
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-7">
                                        <input type="text" className="form-control" name="passkey" placeholder="Enter your secret key"></input>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="form-group">
                            <div className="container">
                                <div className="row">
                                    <button className="btn-lg btn-success">Register</button>
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



