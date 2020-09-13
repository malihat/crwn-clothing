import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component.jsx';
import {Route, Switch, BrowserRouter} from 'react-router-dom';

const HatsPage = () => (
  <div>
    <h1> Hats Page </h1>
  </div>
)

function App() {
  return (
    <BrowserRouter> 
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/" component={HatsPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
