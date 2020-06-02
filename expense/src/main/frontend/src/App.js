import React from 'react';
import {BrowserRouter, Route,Switch} from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Category from './components/Category';
import Expense from './components/Expense';
import Gemini from "./components/Gemini";
import Blue from "./components/Blue";
import Ocean from "./components/Ocean";

function App() {
  return (
      <BrowserRouter>
        <Switch>
          <Route path='/' exact={true} component={Home} />
          <Route path='/categories' exact={true} component={Category} />
          <Route path='/expenses' exact={true} component={Expense} />
          <Route path='/gemini' exact={true} component={Gemini} />
          <Route path='/blue' exact={true} component={Blue} />
          <Route path='/ocean' exact={true} component={Ocean} />
        </Switch>
      </BrowserRouter>
  )
  ;
}

export default App;
