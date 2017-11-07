import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, Link, Redirect} from "react-router-dom"
import AuthAdapter from "./components/AuthAdapter"
import Home from "./components/Home"
import {ConnectedLogin} from "./components/Login"

class App extends Component {
  state = {
    isLoggedIn: false
  }
  logIn(loginParams){
    AuthAdapter.login(loginParams)
      .then( user => {
        if (!user.error) {
          this.setState({
            auth: { isLoggedIn: true, user: user}
          })
          localStorage.setItem('jwt', user.jwt )
        }
      })
  }
  logout(){
    localStorage.removeItem('jwt')
    this.setState({ auth: { isLoggedIn: false, user:{}}})
  }
  componentWillMount(){
      if (localStorage.getItem('jwt')) {
       AuthAdapter.currentUser()
         .then(user => {
           if (!user.error) {
             console.log("fetch user");
             this.setState({
               isLoggedIn: true
             }, () => console.log(this.state.isLoggedIn))
           }
         })
     }
    //  else {
    //    <div>
    //     {this.props.users ? this.logIn(this.props.users) : null}
    //    <Route exact path="/login" render={(props) => <ConnectedLogin {...props} />} />
    //    <Redirect to="/login"/>
    //  </div>
    //  }
   }

  // componentWillUpdate () {
  //   console.log('Updating')
  //   if (!localStorage.getItem('jwt')) this.props.history.push('/login')
  // }
  render() {
    return (
      <div className="App">

        <button onClick={AuthAdapter.logout}>Log Out</button>

        {localStorage.getItem("jwt") ? <Redirect to="/home" /> : <Redirect to="/login"/> }

        <Route exact path="/login" render={(props) => <ConnectedLogin {...props} login={"hello"} />} />
        <Route exact path='/home' render={(props)=>{ return <Home {...props}/>}} />
      </div>
    );
  }
}

export default App;
