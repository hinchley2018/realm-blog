import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
import PostsList from "./PostsList";

export default class App extends Component {
    constructor(props){
        super(props);
        this.state={
            posts: []
        }

    }
    componentDidMount(){

        axios.get('api/posts')
            .then(res=>{
                this.setState({
                    posts: res.data
                });

            })
    }
    render() {
        return (
            <div>
                <h2>Posts</h2>
                <PostsList posts={this.state.posts}/>

            </div>
        );
    }

}

App.propTypes = {

};