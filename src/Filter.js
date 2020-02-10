import React, { Component } from 'react';
import axios from 'axios';

class Filter extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: true,
            error: null
        };
    }

    componentDidMount() {
        axios.get(`http://github.com/public-apis/public-apis`)
            .then(res => {
                console.log(res);
                // Transform the raw data by extracting the nested posts
                const data = res.data.data.children.map(obj => obj.data);

                // Update state to trigger a re-render.
                // Clear any errors, and turn off the loading indiciator.
                this.setState({
                    data,
                    loading: false,
                    error: null
                });
            })
            .catch(err => {
                // Something went wrong. Save the error in state and re-render.
                this.setState({
                    loading: false,
                    error: err
                });
            });
    }

    renderLoading() {
        return <div>Loading...</div>;
    }

    renderError() {
        return (
            <div>
                ERROR: {this.state.error.message}
            </div>
        );
    }

    renderPosts() {
        if(this.state.error) {
            return this.renderError();
        }

        return (
            <ul>
                {this.state.data.map(post =>
                    <li key={post.id}>{post.title}</li>
                )}
            </ul>
        );
    }

    render() {
        return (
            <div>
                {/*<h1>{`/r/${this.props.subreddit}`}</h1>*/}
                {this.state.isLoading ?
                    this.renderLoading()
                    : this.renderPosts()}
            </div>
        );
    }
}

export default Filter