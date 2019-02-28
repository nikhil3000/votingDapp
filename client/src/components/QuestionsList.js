import React from 'react';
import axios from 'axios';


export default class QuestionsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: undefined
        }
    }
    componentDidMount() {
        axios('http://localhost:5000/getdata',{
            method: "get",
    }).then(response => {
        console.log(response);
        this.setState({
            data: response.data,
        })

    })
    
        }
    render () {
        return (
            <div>            
            <table className="table table-striped">
            <thead>
            <tr>
            <th>S.No</th>
            <th>Question</th>
            <th>Count</th>
            </tr>
            </thead>
            <tbody>
    {
    this.state.data && this.state.data.map ((data,index) =>(
        <tr>
        <td>{index+1}</td>
        <td>{data.question}</td>
        <td>{data.count}</td>
        <td><button className="btn btn-primary">Vote</button></td>
      </tr>
    )
    ) 
    }
    </tbody>
  </table>
            </div>
        )
    }
}