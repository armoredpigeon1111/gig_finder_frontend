import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import axios from 'axios';

const mapStyles = {
  width: '50%',
  height: '50%'
};

export class FanRSVPMap extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            // street: "122 State St",
            // city: "West Columbia",
            // state: "SC",
            // lat: 33,
            // long: -81,
         }
    }

    componentDidMount(){
        // this.getGeocode();
    }

    // getGeocode = async () => {
    //     try{
    //       const jwt = localStorage.getItem('token');
    //       let response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.street}, ${this.state.city},${this.state.state}&key=AIzaSyBB3PQoqrOk8hba3wWHMuQyh-xG_gvXDY4`);
        
    //       console.log("geocode");
    //       console.log(response.data);
    //       console.log(response.data.results[0].geometry.location.lat);
    //       console.log(response.data.results[0].geometry.location.lng);
    //       this.state.lat = response.data.results[0].geometry.location.lat
    //       this.state.long = response.data.results[0].geometry.location.lng
    //       this.setState({
    //           lat:response.data.results[0].geometry.location.lat,
    //           long:response.data.results[0].geometry.location.lng
    //       })
    //       this.forceUpdate();
    //     }
    //     catch(error){
    //       console.log(error);
    //     }

    //   } 

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={
          {
            lat: this.props.lat,
            lng: this.props.long
          }
        }
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBB3PQoqrOk8hba3wWHMuQyh-xG_gvXDY4'
})(FanRSVPMap);