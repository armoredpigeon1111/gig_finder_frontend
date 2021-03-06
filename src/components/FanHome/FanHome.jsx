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
            fan_id: this.props.fan_id, //experimenting with props instead of null
            // fan_id:1, 
            genre1: "",
            genre2: "",
            genre3: "",
            gigsList: [],
            reviewGigID: 0,
            showReview:false,
            showDetail: false,
            gig: [],
            gigs: [],
            allReviews: [],
            reviews: [],
            allRSVPs: [],
            fanRSVPs: [],
            fanGigs: [],
            RSVPGigs: [],
            street: "122 State St",
            city: "West Columbia",
            state: "SC",
            lat: 33.99,
            long: -81.05,
            geocodeData: [],
         }
    }

    componentDidMount(){
        this.getAllFans();
        this.getAllRSVPs();
        // this.getGeocode();
    }



    getAllFans = async () => {
        try{
          const jwt = localStorage.getItem('token');
          let response = await axios.get(`http://127.0.0.1:8000/api/fans/`, {headers: {Authorization: 'Bearer ' + jwt}});
          this.setState({
            fans: response.data
          });
          this.findFan();
          this.getGenres();
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
          gig.genre.toLowerCase() === this.state.genre1.toLowerCase() ||
          gig.genre.toLowerCase() === this.state.genre2.toLowerCase() ||
          gig.genre.toLowerCase() === this.state.genre3.toLowerCase())
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
        // this.getGenres();
        // this.getAllFans();
        this.getAllRSVPs();
        this.getAllGigs();
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
          // console.log("findReviews");
          // console.log(gigId);
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
              this.forceUpdate();
              this.findRSVPs();
            }
            catch(error){
              console.log(error);
            }
            
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
            // this.state.fanRSVPs.forEach(element =>
            //     this.state.fanGigs.push(element.gig)
            //   );
            this.state.fanRSVPs.map(element =>
                this.state.fanGigs.push(element.gig)
              );
              console.log("findFanGigIDs");
              console.log(this.state.fanGigs);
            // this.listRSVPGigs();
            this.getAllGigs();
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
                this.listRSVPGigs();
              }
              catch(error){
                console.log(error);
              }
              
            }
    
        // findFan = () =>{
        //     this.props.findFan();
        // }

          listRSVPGigs = () => {
            // debugger;
            for(let i = 0; i < this.state.fanGigs.length; i++){
              const results = this.state.gigs.filter(gig => gig.id === this.state.fanGigs[i]);
              console.log("gigs");
              console.log(this.props.gigs);
              console.log("results");
              console.log(results);
              this.state.RSVPGigs.push(results);
            }       
            console.log("listRSVPGIG");
            console.log(this.state.RSVPGigs);
            this.tryGeocode();
          }

          tryGeocode = () =>{
            for(let i = 0; i<this.state.RSVPGigs.length; i++){
              console.log("tryGeocode");
              console.log(this.state.RSVPGigs[i][0].street);
              console.log(this.state.RSVPGigs[i][0].city);
              console.log(this.state.RSVPGigs[i][0].state);
              this.getGeocode(this.state.RSVPGigs[i][0].street, this.state.RSVPGigs[i][0].city, this.state.RSVPGigs[i][0].state)
            }
          }

          getGeocode = async (street, city, state) => {

            try{
              const jwt = localStorage.getItem('token');
              let response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${street}, ${city},${state}&key=AIzaSyBB3PQoqrOk8hba3wWHMuQyh-xG_gvXDY4`);
            
              console.log("geocode");
              console.log(response.data);
              console.log(response.data.results[0].geometry.location.lat);
              console.log(response.data.results[0].geometry.location.lng);
              this.state.geocodeData.push([response.data.results[0].geometry.location.lat, response.data.results[0].geometry.location.lng]);
              
              this.forceUpdate();
            }
            catch(error){
              console.log(error);
            }
      
          } 

          reload= ()=>{
            this.getAllRSVPs();
            this.getAllGigs();
          }


    render() { 
        return ( 
            <div>
                
              <h1>Suggested Gigs</h1>
              <table class="table table-striped table-dark">
                <thead>
                    <tr>
                        <th>Street</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Zipcode</th>
                        <th>Date and Time</th>
                        <th>Likes</th>
                        <th>Like</th>
                        <th>RSVP</th>
                        <th>Review</th>
                        <th>Details</th>
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
                                <td><button className="btn btn-primary" onClick={() => this.likeGig(gig.id)}>Like</button></td>
                                <td><button className="btn btn-primary" onClick={() => this.RSVPGig(gig.id)}>RSVP</button></td>
                                <td><button className="btn btn-primary" onClick={() => {this.reviewGig(gig.id); this.onClickButton();}}>Review</button></td>
                                <td><button className="btn btn-primary" onClick={() => this.showDetail(gig.id)}>Details</button></td>
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
            <button className="btn btn-danger" onClick={()=> this.reload()}>Reload</button>
            <FanRSVPMap geocodeData={this.state.geocodeData} lat={this.state.lat} long={this.state.long}/>
            </div>
         );
    }
}
 
export default FanHome;