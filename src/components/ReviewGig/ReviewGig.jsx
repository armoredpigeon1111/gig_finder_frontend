import React, { Component } from 'react';
import axios from 'axios';
import './ReviewGig.css'

class ReviewGig extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            body: "",
         }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.reviewGig();
        this.props.closeReview();
    }

    reviewGig = async (gig_id) => {
        const review ={
          gig: this.props.gig_id,
          body: this.state.body
        }
        try{
          const jwt = localStorage.getItem('token');
          let response = await axios.post(`http://127.0.0.1:8000/api/reviews/`, review, {headers: {Authorization: 'Bearer ' + jwt}});
        }
        catch(error){
          console.log(error);
        }
        alert("You posted a review.");
      } 

    render() { 
        return ( 
            <div className="reviewGig">
                <h1>Review Gig</h1>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                <label><strong>Leave Review</strong></label>
                <input type="textarea" name="body" rows="4" cols="50" onChange={this.handleChange} value={this.state.body} />
                <button className="btn btn-primary" type="submit">Submit</button>
                </form>
            </div>
         );
    }
}
 
export default ReviewGig;