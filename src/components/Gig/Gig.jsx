import React, { Component } from 'react';
import axios from 'axios';

class CreateGig extends Component {
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
            musician: this.state.musician_id
        }

        try{
          const jwt = localStorage.getItem('token');
        //   console.log(jwt);
        //   console.log(this.state.genre);
          let response = await axios.post(`http://127.0.0.1:8000/api/gigs/`, profileInfo, {headers: {Authorization: 'Bearer ' + jwt}} );

        //   console.log(response);
        }
        catch(error){
          console.log(error);
        }

      }

    findMusician = () =>{
        // console.log("User ID: ")
        // console.log(this.props.user_id);
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
            console.log("getAllGigs");
            console.log(this.state.gigs);
          }
          catch(error){
            console.log(error);
          }
          this.findGigs();
        }

        findGigs = () =>{
            console.log("Musician ID: ")
            console.log(this.state.musician_id);
              const results = this.state.gigs.filter(gig =>
              gig.musician === this.state.musician_id)
                  this.setState({
                      gigs: results
                  });
              console.log("GigList")             ;
              console.log(results);
          }

          async deleteGig(gigID) {
            const jwt = localStorage.getItem('token');
            let response = await axios.delete(`http://127.0.0.1:8000/api/gigs/${gigID}/delete`, {headers: {Authorization: 'Bearer ' + jwt}});
            console.log(response);
            window.location.reload();
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
                                <td>  <button className="btn" onClick={() => this.deleteGig(gig.id)}>Delete</button></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            </div>
         );
    }
}
 
export default CreateGig;