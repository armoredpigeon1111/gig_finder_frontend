import React, { Component } from 'react';
import FanRegister from '../FanRegister/FanRegister';
import FanHome from '../FanHome/FanHome';

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
                <FanHome user_id={this.props.user_id} />
                :
                <FanRegister user_id={this.props.user_id} />
                }
                
            </div>
         );
    }
}
 
export default Fan;