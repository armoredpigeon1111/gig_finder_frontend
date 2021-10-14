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

                {/* <table>

                    <tbody> */}
                        {this.props.gig.map((gig) => {
                            return(
                                <div>
                                    <p>{gig.street} {gig.city}, {gig.state} {gig.zipcode}</p>
                                    <p>Likes: {gig.likes}</p>
                                </div>
                            );
                        })}
                    {/* </tbody>
                    </table> */}
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