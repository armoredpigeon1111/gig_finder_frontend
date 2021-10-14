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
         }
    }

    componentDidMount(){
        this.props.getAllFans();
        this.getAllGigs();
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
            console.log("getAllGigs");
            console.log(this.state.gigs);
          }
          catch(error){
            console.log(error);
          }
          
        }

    findFan = () =>{
        this.props.findFan();
    }




    render() { 
        return ( 
            <div>
                <FanRegister user_id={this.props.user_id} findFan={this.findFan}/>
                <FanHome  user_id={this.props.user_id} gigs={this.state.gigs}/>

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