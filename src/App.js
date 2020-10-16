import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Switch,Route} from 'react-router-dom';
import Login from './viewComponents/Login';
import Signup from './viewComponents/Signup';
import Home from './Home';

function App() {
  return (
    <div className="App">
      <Route exact path = "/" component={Login} />
      <Route exact path = "/newuser" component={Signup} />
      <Route path = "/landingpage" component = {Home} />
    </div>
  );
}

export default App;
