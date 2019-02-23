import React from 'react';

export default class QuestionsList extends React.Component {
    constructor(props) {
        super(props);

    }
    render () {
        return (
            <div>
            <p>The .table-striped class adds zebra-stripes to a table:</p>            
  <table class="table table-striped">
    <thead>
      <tr>
        <th>Firstname</th>
        <th>Lastname</th>
        <th>Email</th>
      </tr>
    </thead>
    <tbody>
    {
    this.props.question && this.props.question.map ((question,index) =>(
        <tr>
        <td>{index}</td>
        <td>{question}</td>
        <td>{this.props.count}</td>
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