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

    getAllMusicians = () =>{
        this.props.getAllMusicians();
    }

    findMusician = () => {
        this.props.findMusician();
    }

    render() { 

        if(this.props.isMusician){
            return(
                <Musician user_id={this.props.user_id} 
                findMusician={this.findMusician}
                getAllMusicians={this.getAllMusicians}
                existingMusician={this.props.existingMusician}
                />
            );
        }else{
            return(
                <Fan user_id={this.props.user_id} />
            );
        }
    }
}
 
export default Home;