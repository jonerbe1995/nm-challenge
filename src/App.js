import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Filter from './Filter';
import './App.css';

class App extends Component{
  render() {
    return (
        <Router>
          <div className="App">
            <Route path="/" exact={true} component={Filter}/>
          </div>
        </Router>
    );
  }
}

export default App;
