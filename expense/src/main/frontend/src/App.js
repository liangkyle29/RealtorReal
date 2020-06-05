import React from 'react';
import {BrowserRouter, Route,Switch} from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Category from './components/Category';
import Expense from './components/Expense';
import Gemini from "./components/Gemini";
import Blue from "./components/Blue";
import Ocean from "./components/Ocean";
import Login from "./components/Login";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import Logout from "./components/Logout";

function App() {
  return (
      <BrowserRouter>
        <Switch>
          <Route path='/' exact={true} component={Home} />
          <Route path="/login" exact={true} component={Login} />
          {/*<Route path="/home" exact={true} component={Home} />*/}
          <AuthenticatedRoute path='/categories' exact={true} component={Category} />
          <AuthenticatedRoute path='/expenses' exact={true} component={Expense} />
          <AuthenticatedRoute path='/gemini' exact={true} component={Gemini} />
          <AuthenticatedRoute path='/blue' exact={true} component={Blue} />
          <AuthenticatedRoute path='/ocean' exact={true} component={Ocean} />
          <AuthenticatedRoute path='/logout' exact={true} component={Logout} />
        </Switch>
      </BrowserRouter>
  )
  ;
}

export default App;
