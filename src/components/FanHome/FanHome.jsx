import React, { Component } from 'react';
import axios from 'axios';
import ReviewGig from '../ReviewGig/ReviewGig';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css'
import FanDetailGig from '../FanDetailGig/FanDetailGig';
import FanRSVPMap from '../FanRSVPMap/FanRSVPMap';

class FanHome extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            fans: [],
            fan_id: 0, 
            genre1: "",
            genre2: "",
            genre3: "",
            gigsList: [],
            reviewGigID: 0,
            showReview:false,
            showDetail: false,
            gig: [],
            allReviews: [],
            reviews: [],
            allRSVPs: [],
            fanRSVPs: [],
            fanGigs: [],
            RSVPGigs: [],
            street: "122 State St",
            city: "West Columbia",
            state: "SC",
            lat: 0,
            long: 0,
         }
    }

    componentDidMount(){
        this.getAllFans();
        this.getAllRSVPs();
        this.getGeocode();
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
        this.getGenres();
      }

    //Get matching fan ID
    findFan = () =>{
          const results = this.state.fans.filter(fan =>
          fan.user === this.props.user_id)
          if(results.length !== 0){
              this.setState({
                  fan_id: results[0].id
              });                       
          } 
      }

    //Get user Genres
    getGenres = async () => {
        console.log("getGenresFan");
        console.log(this.state.fan_id);
        try{
          const jwt = localStorage.getItem('token');
          let response = await axios.get(`http://127.0.0.1:8000/api/fans/${this.state.fan_id}/`, {headers: {Authorization: 'Bearer ' + jwt}});
          this.setState({
            genre1: response.data[0].genre1,
            genre2: response.data[0].genre2,
            genre3: response.data[0].genre3
          });
          console.log("getGenres")
          console.log(response.data[0].genre1);
        }
        catch(error){
          console.log(error);
        }
        // this.findFan();
        this.findGigs();
      }

      findGigs = () =>{
          const results = this.props.gigs.filter(gig =>
          gig.genre === this.state.genre1.toLowerCase() ||
          gig.genre === this.state.genre2.toLowerCase() ||
          gig.genre === this.state.genre3.toLowerCase())
              this.setState({
                  gigsList: results
              });
              this.forceUpdate();
      }

      likeGig = async (gig_id) => {
        try{
          const jwt = localStorage.getItem('token');
          let response = await axios.patch(`http://127.0.0.1:8000/api/gigs/${gig_id}/like`, {headers: {Authorization: 'Bearer ' + jwt}});
        }
        catch(error){
          console.log(error);
        }
        this.getGenres();
        alert("Like Added");
      } 

      RSVPGig = async (gig_id) => {
        const gig ={
          gig: gig_id,
          fan: this.state.fan_id
        }
        try{
          const jwt = localStorage.getItem('token');
          let response = await axios.post(`http://127.0.0.1:8000/api/rsvps/`, gig, {headers: {Authorization: 'Bearer ' + jwt}});
        }
        catch(error){
          console.log(error);
        }
        alert("You sent an RSVP.");
      } 

      reviewGig = (gig_id) =>{
        this.state.reviewGigID = gig_id;
      }

      //modal
      onClickButton = e =>{
        this.state.showReview = true;
        // this.setState({openModal: true})
        this.forceUpdate();

      }

      closeReview = () =>{
        this.state.showReview = false;
        this.forceUpdate();
      }

      showDetail = (gigId) => {
        this.state.gigID = gigId;
        this.state.showDetail = true;
        this.setState({
          gigID: gigId
        })
        this.findGig(gigId);
        this.getAllReviews(gigId);
      }

      closeDetail = () =>{
        this.state.showUpdate = false;
        this.forceUpdate();
      }

      findGig = (gigId) =>{
        const results = this.props.gigs.filter(gig =>
        gig.id === gigId)
            this.setState({
                gig: results
            });
            this.forceUpdate();
      }

      getAllReviews = async (gigId) => {
        try{
            const jwt = localStorage.getItem('token');
            let response = await axios.get(`http://127.0.0.1:8000/api/reviews/`, {headers: {Authorization: 'Bearer ' + jwt}});
            this.setState({
              allReviews: response.data
            });
          }
          catch(error){
            console.log(error);
          }
          this.findReviews(gigId);
        }

        findReviews = (gigId) =>{
          console.log("findReviews");
          console.log(gigId);
          const results = this.state.allReviews.filter(review =>
          review.gig === gigId)
              this.setState({
                  reviews: results
              });
          this.forceUpdate();
          console.log(this.state.reviews);
        } 

        getAllRSVPs = async () => {
          try{
              const jwt = localStorage.getItem('token');
              let response = await axios.get(`http://127.0.0.1:8000/api/rsvps/`, {headers: {Authorization: 'Bearer ' + jwt}});
              this.setState({
                allRSVPs: response.data
              });
            }
            catch(error){
              console.log(error);
            }
            this.findRSVPs();
          }

          findRSVPs = () =>{
            console.log("findRSVPs");
            console.log(this.state.fan_id);
            const results = this.state.allRSVPs.filter(rsvp =>
            rsvp.fan === this.state.fan_id)
                this.setState({
                    fanRSVPs: results
                });
            this.forceUpdate();
            console.log(this.state.fanRSVPs);
            this.findFanGigIDs();
          }

          findFanGigIDs = () =>{
            this.state.fanRSVPs.forEach(element =>
                this.state.fanGigs.push(element.gig)
              );
            this.listRSVPGigs();
          }

          listRSVPGigs = () => {
            // debugger;
            for(let i = 0; i < this.state.fanGigs.length; i++){
              const results = this.props.gigs.filter(gig => gig.id === this.state.fanGigs[i]);
              this.state.RSVPGigs.push(results);
            }       
            console.log("RSVPGIG");
            console.log(this.state.RSVPGigs);
          }

          getGeocode = async () => {
            try{
              const jwt = localStorage.getItem('token');
              let response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.street}, ${this.state.city},${this.state.state}&key=AIzaSyBB3PQoqrOk8hba3wWHMuQyh-xG_gvXDY4`);
            
              console.log("geocode");
              console.log(response.data);
              console.log(response.data.results[0].geometry.location.lat);
              console.log(response.data.results[0].geometry.location.lng);
              this.state.lat = response.data.results[0].geometry.location.lat
              this.state.long = response.data.results[0].geometry.location.lng
              this.setState({
                  lat:response.data.results[0].geometry.location.lat,
                  long:response.data.results[0].geometry.location.lng
              })
              this.forceUpdate();
            }
            catch(error){
              console.log(error);
            }
    
          } 


    render() { 
        return ( 
            <div>
                
              <h1>Suggested Gigs</h1>
              {/* <button onClick={() => this.getGenres()}>Reload</button> */}
              <table>
                <thead>
                    <tr>
                        <th>Street</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Zipcode</th>
                        <th>Date and Time</th>
                        <th>Likes</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.gigsList.map((gig) => {
                        return(
                            <tr key={gig.id}>
                                <td>{gig.street}</td>
                                <td>{gig.city}</td>
                                <td>{gig.state}</td>
                                <td>{gig.zipcode}</td>
                                <td>{gig.dateTime}</td>
                                <td>{gig.likes}</td>
                                <td><button className="btn" onClick={() => this.likeGig(gig.id)}>Like</button></td>
                                <td><button className="btn" onClick={() => this.RSVPGig(gig.id)}>RSVP</button></td>
                                <td><button className="btn" onClick={() => {this.reviewGig(gig.id); this.onClickButton();}}>Review</button></td>
                                <td>  <button className="btn" onClick={() => this.showDetail(gig.id)}>Details</button></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            
            {this.state.showReview?
            <ReviewGig gig_id={this.state.reviewGigID} closeReview={this.closeReview}/>
            :
            null
            }
            
            {this.state.showDetail?
            <FanDetailGig reviews={this.state.reviews} gig={this.state.gig} gigs={this.state.gigs} gigID={this.state.gigID} closeUpdate={this.closeDetail}/>
            :
            null
            } 
            
            <FanRSVPMap lat={this.state.lat} long={this.state.long}/>
            </div>
         );
    }
}
 
export default FanHome;