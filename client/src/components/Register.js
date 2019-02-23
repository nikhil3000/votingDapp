import React from 'react';


export default class Register extends React.Component {

    render() {
        return (
            <div className="card register">
                <div className="card-body">
                    <form>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-5">
                                        <input type="text" className="form-control" name="email" placeholder="Enter your email"></input>
                                    </div>
                                    <div className="col-sm-2">
                                        <button className="btn btn-primary">Send OTP</button>
                                    </div>
                                    <div className="col-sm-3">
                                        <input type="text" className="form-control" name="otp" placeholder="Email OTP"></input>
                                    </div>
                                    <div className="col-sm-2">
                                        <button className="btn btn-primary">Submit OTP</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Mobile number</label>
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-5">
                                        <input type="text" className="form-control" name="mobile" placeholder="Enter your Mobile Number"></input>
                                    </div>
                                    <div className="col-sm-2">
                                        <button className="btn btn-primary">Send OTP</button>
                                    </div>
                                    <div className="col-sm-3">
                                        <input type="text" className="form-control" name="otp" placeholder="Mobile OTP"></input>
                                    </div>
                                    <div className="col-sm-2">
                                        <button className="btn btn-primary">Submit OTP</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">PassKey</label>
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-5">
                                        <input type="text" className="form-control" name="passkey" placeholder="Enter your secret key"></input>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-10"></div>
                                    <div className="col-sm-2">
                                        <button className="btn-lg btn-success">Register</button>
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
{/* <input type="text" class="form-control otp" name="otp" placeholder="Check your inbox for OTP"></input> */}



