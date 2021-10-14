import React, { Component } from 'react';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Musician from './components/Musician/Musician'
import Fan from './components/Fan/Fan'
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import { Redirect, Route, Switch} from "react-router";
import {BrowserRouter} from "react-router-dom";
import axios from 'axios';
import jwtDecode from "jwt-decode";
import 'bootstrap/dist/css/bootstrap.min.css'
import "./App.css"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      user: null,
      user_id: null,
      isMusician: false,
      musicians: [],
      fans: [],
      existingMusician: false,
      existingFan: false,
     }
  }


componentDidMount(){

}

setUpUser(){
  const jwt = localStorage.getItem('token');
  try{
    const user = jwtDecode(jwt);
    this.setState({user});
    this.setState({
      user_id: user.user_id
    })
    this.getUserType(user.user_id);
  }
  catch(error){
    console.log(error);
  }
}

loginUser = async (credentials) =>{
  try{
    let response = await axios.post("http://127.0.0.1:8000/api/auth/login/", credentials);
    localStorage.setItem("token", response.data.access);
    this.setUpUser();
  }
  catch(error){
    console.log(error);
  }
};

logoutUser = () =>{
  localStorage.removeItem('token');
  this.setState({
    user: null,
    user_id: null,
    existingMusician: false,
  });
  console.log("Logout");
}

findMusician = () =>{
    const results = this.state.musicians.filter(musician =>
    musician.user === this.state.user_id)
    if(results.length !== 0){
        this.setState({
            existingMusician: true
        });
        this.forceUpdate();
    }
}

getAllMusicians = async () => {
  try{
    const jwt = localStorage.getItem('token');
    let response = await axios.get(`http://127.0.0.1:8000/api/musicians/`, {headers: {Authorization: 'Bearer ' + jwt}});
    this.setState({
      musicians: response.data
    });
  }
  catch(error){
    console.log(error);
  }
  this.findMusician();
}

getAllFans = async () => {
  try{
    const jwt = localStorage.getItem('token');
    let response = await axios.get(`http://127.0.0.1:8000/api/fans/`, {headers: {Authorization: 'Bearer ' + jwt}});
    this.setState({
      fans: response.data
    });
  }
  catch(error){
    console.log(error);
  }
  this.findFan();
}

findFan = () =>{
    const results = this.state.fans.filter(fan =>
    fan.user === this.state.user_id)
    console.log("Find Fan App");
    console.log(results);
    console.log(results.length);
    if(results.length !== 0){
        this.state.existingFan = true;
        this.setState({
            existingFan: true
        });
        this.forceUpdate();
    }
}

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
    const user = this.state.user;
    return ( 

      <div>
        <NavBar user={user} logoutUser={this.logoutUser}/>
        <BrowserRouter>
          <Switch>

            <Route path = '/' exact render={(props)=>{
              if(!user){
                return (<Login {...props} loginUser={this.loginUser}/>);
              }else{
                return (<Home {...props} user_id={this.state.user_id} 
                  isMusician={this.state.isMusician} 
                  findMusician={this.findMusician}
                  getAllMusicians={this.getAllMusicians}
                  existingMusician={this.state.existingMusician}
                  getAllFans={this.getAllFans}
                  findFan={this.findFan}
                  existingFan={this.state.existingFan}
                  />);
              }
            }} />

            <Route path = "/login" render={(props) =>(<Login {...props} loginUser={this.loginUser}/>)}/>
            <Route path = "/musician" render={(props) =>(<Musician {...props} user_id={this.state.user_id}/>)}/>
          </Switch>
        </BrowserRouter>
      </div>

     );
  }
}
 
export default App;