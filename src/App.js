import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Login from './components/Login';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Home from './components/Home';
import Register from './components/Register';
import MarketPrice from './components/MarketPrice';
import SetPrice from './components/SetPrice';
import AddItem from './components/AddItem';
import Category from './components/Category';
import Location from './components/Location';
// import {UserContext} from "./contexts/UserContext";
import Edit from './components/Edit';
import LocationItems from './components/LocationItems';

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/" component={Header} />
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute exact path="/market-price" component={MarketPrice} />
        <Route exact path="/market-price/:id" render={(props) => <Category {...props} />}/>
        <Route exact path="/set-price/:id" render={(props) => <Edit {...props} />} />
        <Route exact path="/location-items/:id" render={(props) => <LocationItems {...props} /> }/>
        <PrivateRoute exact path="/set-price" component={SetPrice} />
        <PrivateRoute exact path="/add-item" component={AddItem} />
        </div>
    </Router>
    );
  }
  
export default App;