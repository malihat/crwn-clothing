import React from 'react';
import {connect} from 'react-redux';
import {setCurrentUser} from './redux/user/user.actions'
import './App.css';
import HomePage from './pages/homepage/homepage.component.jsx';
import {Route, Switch, BrowserRouter, Redirect} from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import {auth, createUserProfileDocument} from './firebase/firebase.utils'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

class App extends React.Component  {
  unsubscribeFromAuth = null

  componentDidMount() {
    const {setCurrentUser} = this.props;
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
        </Switch>  
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))  //dispatching action --> reducer
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
