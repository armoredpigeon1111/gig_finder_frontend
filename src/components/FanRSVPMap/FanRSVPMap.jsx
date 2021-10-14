import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
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
             lat: this.props.lat,
             long: this.props.long,
             showInfoWindow: false,
             activeMarker: {},
             selectedPlace: {},
         }
    }

    componentDidMount(){
        // this.getGeocode();
    }

    onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

    onClose = props => {
      if (this.state.showingInfoWindow) {
        this.setState({
          showingInfoWindow: false,
          activeMarker: null
        });
      }
    };

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
      <div>
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
      >
      
      <Marker
          onClick={this.onMarkerClick}
        />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>  

      </Map>

      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBB3PQoqrOk8hba3wWHMuQyh-xG_gvXDY4'
})(FanRSVPMap);