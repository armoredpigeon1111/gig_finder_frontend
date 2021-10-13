import React, { Component } from 'react';
import axios from 'axios';
import ReviewGig from '../ReviewGig/ReviewGig';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css'

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
         }
    }

    componentDidMount(){
        this.getAllFans();
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
          console.log("find gigs");
          console.log(this.props.gigs);
          console.log(this.state.genre1);
          console.log(this.state.genre2);
          console.log(this.state.genre3);
          const results = this.props.gigs.filter(gig =>
          gig.genre === this.state.genre1.toLowerCase() ||
          gig.genre === this.state.genre2.toLowerCase() ||
          gig.genre === this.state.genre3.toLowerCase())
              this.setState({
                  gigsList: results
              });
          console.log("GigList")             ;
          console.log(results);
      }

      likeGig = async (gig_id) => {
        try{
          const jwt = localStorage.getItem('token');
          let response = await axios.patch(`http://127.0.0.1:8000/api/gigs/${gig_id}/like`, {headers: {Authorization: 'Bearer ' + jwt}});
        }
        catch(error){
          console.log(error);
        }
        this.findGigs();
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


    render() { 
        return ( 
            <div>
                
                <h1>Suggested Gigs</h1>
                <button onClick={() => this.getGenres()}>Reload</button>
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
              
            
            </div>
         );
    }
}
 
export default FanHome;