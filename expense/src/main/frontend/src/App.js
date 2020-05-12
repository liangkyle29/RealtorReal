import React from 'react';
import {BrowserRouter, Route,Switch} from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Category from './components/Category';
import Expense from './components/Expense';

function App() {
  return (
      <BrowserRouter>
        <Switch>
          <Route path='/' exact={true} component={Home} />
          <Route path='/categories' exact={true} component={Category} />
          <Route path='/expenses' exact={true} component={Expense} />
        </Switch>
      </BrowserRouter>
  )
  ;
}

export default App;
