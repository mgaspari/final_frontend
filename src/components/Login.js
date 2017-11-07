import React from "react"
import {addUser} from "../actions/users"
import {connect} from 'react-redux'
import {bindActionCreators} from "redux"
import AuthAdapter from "./AuthAdapter"

class Login extends React.Component{
  state = {
    username: "",
    password: "",
    admin: "true"
  }
  submitHandler = (event) => {
    event.preventDefault()
    this.props.addUser(this.state.username)
    AuthAdapter.login(this.state)
    }
  handleChangeUN = (event) => {
    this.setState({
      username: event.target.value
    })
  }
  handleChangePW = (event) => {
    this.setState({
      password: event.target.value
    })
  }
  render(){
    return(
      <form onSubmit={this.submitHandler}>
        <p>Username: </p><input type="text" value={this.state.username} onChange={this.handleChangeUN}/>
        <p>Password: </p><input type="text" value={this.state.password} onChange={this.handleChangePW}/>
        <input type="submit"/>
      </form>
    )
  }
}

const mapStateToProps = (state) => {
    return {users: state.manageUsers.users}
}


// It is likely that you will have to call addUser with this.state


export const ConnectedLogin = connect(mapStateToProps, { addUser })(Login)
