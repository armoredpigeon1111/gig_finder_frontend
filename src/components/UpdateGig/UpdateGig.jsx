import React, { Component } from 'react';
import axios from 'axios';

class UpdateGig extends Component {
    constructor(props) {
        super(props);
        this.state = { 
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
        this.findGig();
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.updateGig();
        this.props.closeUpdate();
    }

    updateGig = async () => {
        const gig = {
            id: this.props.gigID,
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
            let response = await axios.patch(`http://127.0.0.1:8000/api/gigs/${this.props.gigID}/update`, gig, {headers: {Authorization: 'Bearer ' + jwt}});
          }
          catch(error){
            console.log(error);
          }
        
        }

    findGig = () =>{
        console.log("Gig ID: ")
        console.log(this.props.gigID);
          const results = this.props.gigs.filter(gig =>
          gig.id === this.props.gigID)
              this.setState({
                  id:this.props.gigID,
                  musician_id: results[0].musician,
                  street: results[0].street,
                  city: results[0].city,
                  state: results[0].state,
                  zipcode: results[0].zipcode,
                  likes: results[0].likes,
                  dateTime: results[0].dateTime
              });
          console.log("Gig")             ;
          console.log(results);
      }

    render() { 
        return ( 
            <div>
            <h1>Update Gig</h1>
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
            </div>
         );
    }
}
 
export default UpdateGig;