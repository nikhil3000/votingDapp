import React from 'react';
//import Option from './Option';

export default class Poll extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
         var len;
            this.props.factoryContractUport.methods.numberOfOptions()
            .call({from:0xB4E270a3c6dd57003f4bFe7B06E370d21CDA8087},(err,len)=>{
                console.log('abc');
            })
    }
    render() {
        return  (
            <div>

            <div className="card">
            <div className="card-body">
            {this.props.question}
            <ul>
            {
           
            // this.props.options && this.props.options.map((option, index) => (
            //     <div class="radio">
            //     <label><input type="radio" name="optradio" checked>{option}></input></label>
            //     </div>

            // )) 
            //for(i=0;i<len;i++)
            }  
            </ul>             
            </div>
            </div>
            </div>
        )
    }
}