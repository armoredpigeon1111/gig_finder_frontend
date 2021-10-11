import React, { Component } from 'react';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Musician from './components/Musician/Musician'
import { Redirect, Route, Switch} from "react-router";
import {BrowserRouter} from "react-router-dom";
import axios from 'axios';
import jwtDecode from "jwt-decode";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      user_id: 1,
      isMusician: false,
     }
  }


componentDidMount(){
  // const jwt = localStorage.getItem('token');
  // try{
  //   const user = jwtDecode(jwt);
  //   this.setState({user});
  //   this.setState({
  //     user_id: user.user_id
  //   })
  //   console.log("ComponentDidMount");
  //   this.getUserType(user.user_id);
  // }
  // catch(error){
  //   console.log(error);
  // }
}

setUpUser(){
  const jwt = localStorage.getItem('token');
  try{
    const user = jwtDecode(jwt);
    this.setState({user});
    this.setState({
      user_id: user.user_id
    })
    console.log("setUpUser");
    this.getUserType(user.user_id);
  }
  catch(error){
    console.log(error);
  }
}

loginUser = async (credentials) =>{
  try{
    let response = await axios.post("http://127.0.0.1:8000/api/auth/login/", credentials);
    console.log("login response" + response);
    console.log("Token: " + response.data.access);
    // localStorage.setItem("token", response.data.access);
    localStorage.setItem("token", response.data.access);
    this.setUpUser();
  }
  catch(error){
    console.log(error);
  }
};

getUserType = async (user_id) => {
  try{
    const jwt = localStorage.getItem('token');
    let response = await axios.get(`http://127.0.0.1:8000/api/accounts/${this.state.user_id}/users`, {headers: {Authorization: 'Bearer ' + jwt}});
    this.setState({
      isMusician: response.data[0].is_musician
    });
    console.log("Musician: " + this.state.isMusician);
  }
  catch(error){
    console.log(error);
  }
}


  render() { 
    return ( 

      <div>
        <BrowserRouter>
          <Switch>
            <Route path = "/register" component={Register}/>
            <Route path = "/login" render={(props) =>(<Login {...props} loginUser={this.loginUser}/>)}/>
            <Route path = "/musician" render={(props) =>(<Musician {...props} user_id={this.state.user_id} getUserType={this.getUserType}/>)}/>
          </Switch>
        </BrowserRouter>
      </div>

     );
  }
}
 
export default App;