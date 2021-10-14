import React, { Component } from 'react';
import "./FanDetailGig.css"

class FanDetailGig extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className="detailContainer">
                <h1>Gig Details</h1>

                {/* <table>

                    <tbody> */}
                        {this.props.gig.map((gig) => {
                            return(
                                <div>
                                    <p>{gig.street} {gig.city}, {gig.state} {gig.zipcode}</p>
                                    <p><strong>Likes:</strong> {gig.likes}</p>
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