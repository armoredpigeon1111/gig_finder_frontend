import React, { Component } from 'react';
import "./DetailGig.css"

class DetailGig extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            gig: []
         }
    }

    componentDidMount(){
        
    }



    render() { 
        return ( 

            <div className="detailContainer">
            <h1>Gig Details</h1>

            <table >

                <tbody>
                    {this.props.gig.map((gig) => {
                        return(
                            <tr key={gig.id}>
                                <td>{gig.street}</td>
                                <td>{gig.city}</td>
                                <td>{gig.state}</td>
                                <td>{gig.zipcode}</td>
                                {/* <td>{gig.dateTime}</td>
                                <td>{gig.likes}</td> */}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <h2>Reviews</h2>
            <table >
                {this.props.reviews.map((review)=>{
                    return(
                        <tr key={review.id}>
                            <td>{review.body}</td>
                        </tr>
                    );
                })}
            </table>
           
            <p><strong>RSVPs:</strong>{this.props.gigRSVPs} </p>
            </div>
           
            

         );
    }
}
 
export default DetailGig;