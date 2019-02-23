import React from 'react';
//import Option from './Option';

export default class Poll extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        return  (
            <div>

            <div className="card">
            <div className="card-body">
            {this.props.question}
            <ul>
            {
            this.props.options && this.props.options.map((option, index) => (
                <div class="radio">
                <label><input type="radio" name="optradio" checked>{option}></input></label>
                </div>

            )) 
            } 
            </ul>             
            </div>
            </div>
            </div>
        )
    }
}