import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component.jsx';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';

function App() {
  return (
    <BrowserRouter> 
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/" component={ShopPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
