import React, { Component } from 'react';
import axios from 'axios';
import UpdateGig from '../UpdateGig/UpdateGig';
import DetailGig from '../DetailGig/DetailGig';

class Gig extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            gigs: [],
            musicians: [],
            musician_id : 0,
            street: "",
            city: "",
            state: "",
            zipcode: "",
            likes: 0,
            dateTime: "",
            genre: "",
            gigID: 0,
            showUpdate: false,
            showDetail: false,
            gig: [],
            allReviews: [],
            reviews: [],
            allRSVPs: [],
            gigRSVPs: [],
         }
    }

    componentDidMount(){
        this.getAllMusicians();
        this.getAllGigs();
    }

    componentDidUpdate(){
        
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.createGig();
        this.getAllGigs();
    }

    createGig = async () => {
        const profileInfo = {
            street: this.state.street,
            city: this.state.city,
            state: this.state.state,
            zipcode: this.state.zipcode,
            likes: this.state.likes,
            dateTime: this.state.dateTime,
            musician: this.state.musician_id,
            genre: this.state.genre
        }

        try{
          const jwt = localStorage.getItem('token');
          let response = await axios.post(`http://127.0.0.1:8000/api/gigs/`, profileInfo, {headers: {Authorization: 'Bearer ' + jwt}} );
        }
        catch(error){
          console.log(error);
        }

      }

    findMusician = () =>{
          const results = this.state.musicians.filter(musician =>
          musician.user === this.props.user_id)
          if(results.length !== 0){
              this.setState({
                  musician_id: results[0].id
              });             
          }
      }
      
      getAllMusicians = async () => {
        try{
          const jwt = localStorage.getItem('token');
          let response = await axios.get(`http://127.0.0.1:8000/api/musicians/`, {headers: {Authorization: 'Bearer ' + jwt}});
          this.setState({
            musicians: response.data
          });
          console.log("getAllMusicians");
          console.log(this.state.musicians);
        }
        catch(error){
          console.log(error);
        }
        this.findMusician();
      }

      getAllGigs = async () => {
        try{
            const jwt = localStorage.getItem('token');
            let response = await axios.get(`http://127.0.0.1:8000/api/gigs/`, {headers: {Authorization: 'Bearer ' + jwt}});
            this.setState({
              gigs: response.data
            });
          }
          catch(error){
            console.log(error);
          }
          this.findGigs();
        }

        findGigs = () =>{
              const results = this.state.gigs.filter(gig =>
              gig.musician === this.state.musician_id)
                  this.setState({
                      gigs: results
                  });
          }

          async deleteGig(gigID) {
            const jwt = localStorage.getItem('token');
            let response = await axios.delete(`http://127.0.0.1:8000/api/gigs/${gigID}/delete`, {headers: {Authorization: 'Bearer ' + jwt}});
            console.log(response);
          }

          updateGig = (gigId) => {
            this.state.gigID = gigId;
            this.state.showUpdate = true;
            this.setState({
              gigID: gigId
            })
            console.log(this.state.gigID);
          }

          closeUpdate = () =>{
            this.state.showUpdate = false;
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
            this.getAllRSVPs(gigId);
          }

          closeDetail = () =>{
            this.state.showUpdate = false;
            this.forceUpdate();
          }

          findGig = (gigId) =>{
            const results = this.state.gigs.filter(gig =>
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
            
            getAllRSVPs = async (gigId) => {
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
                this.findRSVPs(gigId);
              }

              findRSVPs = (gigId) =>{
                console.log("findReviews");
                console.log(gigId);
                const results = this.state.allRSVPs.filter(rsvp =>
                rsvp.gig === gigId)
                    this.setState({
                        gigRSVPs: results.length
                    });
                this.forceUpdate();
                console.log(this.state.gigRSVPs);
              } 

    render() { 
        return ( 
            <div>
            <h1>Create Gig</h1>
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <label>Street</label>
                <input type="text" name="street" onChange={this.handleChange} value={this.state.street} /><br />
                <label>City</label>
                <input type="text" name="city" onChange={this.handleChange} value={this.state.city} /><br />
                <label>State</label>
                <input type="text" name="state" onChange={this.handleChange} value={this.state.state} /><br />
                <label>zipcode</label>
                <input type="text" name="zipcode" onChange={this.handleChange} value={this.state.zipcode} /><br />
                <label>Genre</label>
                <input type="text" name="genre" onChange={this.handleChange} value={this.state.genre} /><br />
                <label>Date</label>
                <input type="datetime-local" name="dateTime" onChange={this.handleChange} value={this.state.dateTime} /><br />
                <button type="submit">Submit</button>
            </form>

            <h1>List Gigs</h1>
            <button onClick={() => this.getAllGigs()}>Reload</button>
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
                    {this.state.gigs.map((gig) => {
                        return(
                            <tr key={gig.id}>
                                <td>{gig.street}</td>
                                <td>{gig.city}</td>
                                <td>{gig.state}</td>
                                <td>{gig.zipcode}</td>
                                <td>{gig.dateTime}</td>
                                <td>{gig.likes}</td>
                                <td>  <button className="btn" onClick={() => this.deleteGig(gig.id)}>Delete</button></td>
                                <td>  <button className="btn" onClick={() => this.updateGig(gig.id)}>Update</button></td>
                                <td>  <button className="btn" onClick={() => this.showDetail(gig.id)}>Details</button></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {this.state.showUpdate?
            <UpdateGig gigs={this.state.gigs} gigID={this.state.gigID} closeUpdate={this.closeUpdate}/>:
            null
            }
            
            {this.state.showDetail?
            <DetailGig gigRSVPs={this.state.gigRSVPs} reviews={this.state.reviews} gig={this.state.gig} gigs={this.state.gigs} gigID={this.state.gigID} closeUpdate={this.closeDetail}/>:
            null
            }
            </div>
         );
    }
}
 
export default Gig;