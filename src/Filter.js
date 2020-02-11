import React, { Component } from 'react';

class Filter extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: false,
            error: null,
            searchText: ''
        };
    }

    renderLoading() {
        return <p>Loading...</p>;
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
        let preData = this.state.data.entries, postData = [];
        for(var elem in preData){
            postData.push([preData[elem].Description, elem, preData[elem].API]);
        }
        postData.sort();

        if(this.state.searchText.length > 0) {
            if(postData.length > 0) {
                return (
                    <ul>
                        {postData.map(post =>
                            <li key={post[1]}><p align="left">{post[0] + " (from: " + post[2] + " API)"}</p></li>
                        )}
                    </ul>
                );
            }else{
                return (
                    <p>No results found!</p>
                );
            }
        }else{
            return (
                <p>Try searching for anything!</p>
            );
        }
    }

    async onChangeText(event) {
        if(this.state.searchText !== event.target.value){
            this.setState({searchText: event.target.value, isLoading: true});
            const url = 'https://api.publicapis.org/entries?title=' + this.state.searchText;
            const res = await fetch(url);
            const data = await res.json();
            this.setState({data: data, isLoading: false});
        }
    };

    render() {
        return (
            <div>
                <input type='text' name='searchBar' value={this.state.searchText} onChange={this.onChangeText.bind(this)}/>
                {this.state.isLoading?
                    this.renderLoading()
                    :
                    this.renderPosts()}
            </div>
        );
    }
}

export default Filter