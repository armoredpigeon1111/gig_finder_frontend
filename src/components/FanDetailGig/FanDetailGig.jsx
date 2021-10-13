import React, { Component } from 'react';

class FanDetailGig extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                <h1>Gig Details</h1>

                <table>

                    <tbody>
                        {this.props.gig.map((gig) => {
                            return(
                                <tr key={gig.id}>
                                    <td>{gig.street}</td>
                                    <td>{gig.city}</td>
                                    <td>{gig.state}</td>
                                    <td>{gig.zipcode}</td>
                                    <td>{gig.dateTime}</td>
                                    <td>{gig.likes}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                    </table>
                    <h2>Reviews</h2>
                    <table>
                    <tbody>
                    {this.props.reviews.map((review)=>{
                        return(
                            <tr key={review.id}>
                                <td>{review.body}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>

            </div>
         );
    }
}
 
export default FanDetailGig;