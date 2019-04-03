import React from 'react';

export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="sidenav">
                <div className="sidenav-content">
                    <h1 className="logo-name">Voting Dapp</h1>
                    <ul style={{padding:0}}>
                        <li>
                            <a href="index.html" className="active">Order Book</a>
                        </li>
                        <li>
                            <a href="book.html">Order Fill</a>
                        </li>
                        <li>
                            <a href="history.html">Order History</a>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}