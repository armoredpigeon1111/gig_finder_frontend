import React, { Component } from 'react';
import FanRegister from '../FanRegister/FanRegister';

class Fan extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            existingFan: this.props.existingFan,
         }
    }

    componentDidMount(){
        this.props.getAllFans();
        console.log("existingFan");
        console.log(this.state.existingFan);
    }

    render() { 
        return ( 
            <div>
                {this.state.existingFan ?
                <h1>existing</h1>
                :
                <FanRegister user_id={this.props.user_id} />
                }
                
            </div>
         );
    }
}
 
export default Fan;