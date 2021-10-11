import React, { Component } from 'react';
import Musician from '../Musician/Musician';
import Fan from '../Fan/Fan'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            
         }
    }

    componentDidMount(){

    }

    render() { 

        if(this.props.isMusician){
            return(
                <Musician user_id={this.props.user_id} />
            );
        }else{
            return(
                <Fan user_id={this.props.user_id} />
            );
        }
    }
}
 
export default Home;