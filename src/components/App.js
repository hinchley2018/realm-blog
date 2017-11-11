import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from "axios";

export default class App extends Component {
    constructor(props){
        super(props);
    }
    componenetDidMount(){
        //axios.get()
    }
    render() {
        return (
            <div>
                <h2>Posts</h2>
            </div>
        );
    }

}

App.propTypes = {

};