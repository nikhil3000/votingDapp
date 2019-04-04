import React from 'react';



export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.clickPoll = this.clickPoll.bind(this);
        this.clickRegister = this.clickRegister.bind(this);
    }

    clickPoll(e) {
        e.preventDefault();
        this.props.history.push('/questionslist');
    }

    clickRegister(e) {
        e.preventDefault();
        this.props.history.push('/register');
        
    }   

    render() {
        return (
            <div className="sidenav">
                <div className="sidenav-content">
                    <h1 className="logo-name">Voting Dapp</h1>
                    <ul style={{ padding: 0 }}>
                        <li>
                            <div className="btn-sidebar" onClick={this.clickPoll}>Poll List</div>
                        </li>
                        <li>
                            <div className="btn-sidebar" onClick={this.clickRegister}>Register</div>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

//this.props.history.push('/questionslist')