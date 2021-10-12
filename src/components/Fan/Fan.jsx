import React, { Component } from 'react';
import FanRegister from '../FanRegister/FanRegister';

class Fan extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                <FanRegister user_id={this.props.user_id} />
            </div>
         );
    }
}
 
export default Fan;