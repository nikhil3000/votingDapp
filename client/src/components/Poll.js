import React from 'react';
//import Option from './Option';

export default class Poll extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        console.log(this.props.match.params.address);        
    }
    render() {
        return  (
            <div>

            <div className="card">
            <div className="card-body">
            {this.props.question}
            <ul>
            {
            // var len;
            // this.props.factoryContractUport.methods.numberOfOptions()
            // .call({from:this.props.},(err,len)=>{

            // })
            // // this.props.options && this.props.options.map((option, index) => (
            // //     <div class="radio">
            // //     <label><input type="radio" name="optradio" checked>{option}></input></label>
            // //     </div>

            // // )) 
            // for(i=0;i<len;i++)
             } 
            </ul>             
            </div>
            </div>
            </div>
        )
    }
}