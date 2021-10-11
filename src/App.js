import React, { Component } from 'react';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import { Redirect, Route, Switch} from "react-router";
import {BrowserRouter} from "react-router-dom";
import axios from 'axios';
import jwtDecode from "jwt-decode";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      user_id: 0,
     }
  }


componentDidMount(){
  const jwt = localStorage.getItem('token');
  try{
    const user = jwtDecode(jwt);
    this.setState({user});
    this.setState({
      user_id: user.user_id
    })
  }
  catch(error){
    console.log(error);
  }
}

loginUser = async (credentials) =>{
  try{
    let response = await axios.post("http://127.0.0.1:8000/api/auth/login/", credentials);
    debugger;
    console.log("login response" + response);
    console.log("Token: " + response.data.access);
    localStorage.setItem("token", response.data.access);
  }
  catch(error){
    console.log(error);
  }
};

getUserType = async (user_id) => {
  try{

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
          </Switch>
        </BrowserRouter>
      </div>

     );
  }
}
 
export default App;