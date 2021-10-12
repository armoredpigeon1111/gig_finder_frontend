import React, { Component } from 'react';
import axios from 'axios';
import MusicianRegister from '../MusicianRegister/MusicianRegister';
import Gig from '../Gig/Gig';

class Musician extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            // musicians: [],
            existingMusician: this.props.existingMusician,
         }
    }

    componentDidMount(){
        this.props.getAllMusicians();
        this.state.existingMusician = this.props.existingMusician;

        // console.log("Existing Musician");
        // console.log(this.state.existingMusician);
    }

    componentDidUpdate(){
     
      this.state.existingMusician = this.props.existingMusician;

      // console.log("componentdidupdate Musician");
      // console.log(this.state.existingMusician);
    }

    findMusician = () =>{
      this.props.findMusician();
    }

    getAllMusicians = () =>{
      this.props.getAllMusicians();
    }

    musicianRegistered = () => {
      this.setState({
        existingMusician: true
      })
    }


    render() { 
        return ( 
            <div>
                {this.state.existingMusician ?
                <Gig user_id={this.props.user_id}/>
                :
                <MusicianRegister user_id={this.props.user_id} musicianRegistered={this.musicianRegistered} findMusician={this.findMusician} getAllMusicians={this.getAllMusicians}/>
            }
            </div>
         );
    }
}
 
export default Musician;