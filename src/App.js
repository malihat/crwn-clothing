import React from 'react';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {setCurrentUser} from './redux/user/user.actions'
import './App.css';
import HomePage from './pages/homepage/homepage.component.jsx';
import {Route, Switch, BrowserRouter, Redirect} from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import CheckoutPage from './pages/checkout/checkout.component';

import {auth, createUserProfileDocument, addCollectionAndDocuments} from './firebase/firebase.utils'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { selectCurrentUser } from './redux/user/user.selectors';
import { selectCollectionsForPreview } from './redux/shop/shop.selectors';

class App extends React.Component  {
  unsubscribeFromAuth = null

  componentDidMount() {
    const {setCurrentUser, collectionsArray} = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
            setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
            })
        })
      } 
      // else {
          // this.setState({currentUser: userAuth})   
          setCurrentUser(userAuth)
          addCollectionAndDocuments('collections', collectionsArray);
      // }


      // createUserProfileDocument(user)
      // this.setState({ currentUser: user });
      // console.log(user);
    })
  }

  // close the subscription
  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }
 
  render () {
    return (
      <BrowserRouter> 
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path='/signin' render={() => 
            this.props.currentUser ? (<Redirect to='/'/>) : (<SignInAndSignUpPage />) } />
          <Route exact path='/checkout' component={CheckoutPage} />
        </Switch>  
      </BrowserRouter>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  collectionsArray: selectCollectionsForPreview
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))  //dispatching action --> reducer
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
