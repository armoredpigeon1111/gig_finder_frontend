import React, { Component } from 'react';
import FanRegister from '../FanRegister/FanRegister';
import FanHome from '../FanHome/FanHome';
import axios from 'axios';

class Fan extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            existingFan: this.props.existingFan,
            gigs: [],
            //experiment
            fan_id: null,
         }
    }

    componentDidMount(){
        this.props.getAllFans();
        this.getAllGigs();
        this.getAllFans(); //experiment
        console.log("existingFan");
        console.log(this.state.existingFan);
    }

    getAllGigs = async () => {
        try{
            const jwt = localStorage.getItem('token');
            let response = await axios.get(`http://127.0.0.1:8000/api/gigs/`, {headers: {Authorization: 'Bearer ' + jwt}});
            this.setState({
              gigs: response.data
            });
            // console.log("getAllGigs");
            // console.log(this.state.gigs);
          }
          catch(error){
            console.log(error);
          }
          
        }

    findFan = () =>{
        this.props.findFan();
    }

//experiment

getAllFans = async () => {
    try{
      const jwt = localStorage.getItem('token');
      let response = await axios.get(`http://127.0.0.1:8000/api/fans/`, {headers: {Authorization: 'Bearer ' + jwt}});
      this.setState({
        fans: response.data
      });
      this.findFan();
    //   this.getGenres();
    }
    catch(error){
      console.log(error);
    }

  }

//Get matching fan ID
findFan = () =>{
      debugger;
      const results = this.state.fans.filter(fan =>
      fan.user === this.props.user_id)
      if(results.length !== 0){
          this.setState({
              fan_id: results[0].id
          });  
          this.forceUpdate();                     
      } 
  }

  //end experiment


    render() { 
        return ( 
            <div>
                <FanRegister user_id={this.props.user_id} findFan={this.findFan}/>
                <FanHome fan_id={this.state.fan_id} user_id={this.props.user_id} gigs={this.state.gigs}/>

                {/* {this.state.existingFan ?
                <FanHome user_id={this.props.user_id} gigs={this.state.gigs}/>
                :
                <FanRegister user_id={this.props.user_id} findFan={this.findFan}/>
                } */}
                
            </div>
         );
    }
}
 
export default Fan;