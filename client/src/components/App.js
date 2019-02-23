import React from 'react';
import Poll from './Poll';


export default class App extends React.Component {

    render(){
        return (
            <div>
                Welcome to React App
                <Poll />
            </div>
        );
    }
}