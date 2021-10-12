import React, { Component } from 'react';
import axios from 'axios';
import MusicianRegister from '../MusicianRegister/MusicianRegister';

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
        // this.setState({
        //   existingMusician: this.props.existingMusician
        // })
        console.log("Existing Musician");
        console.log(this.state.existingMusician);
    }

    componentDidUpdate(){
     
      this.state.existingMusician = this.props.existingMusician;
      // this.setState({
      //   existingMusician: this.props.existingMusician
      // })
      console.log("componentdidupdate Musician");
      console.log(this.state.existingMusician);
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
    // getAllMusicians = async () => {
    //     try{
    //       const jwt = localStorage.getItem('token');
    //       let response = await axios.get(`http://127.0.0.1:8000/api/musicians/`, {headers: {Authorization: 'Bearer ' + jwt}});
    //       this.setState({
    //         musicians: response.data
    //       });
    //       console.log(this.state.musicians);
    //     }
    //     catch(error){
    //       console.log(error);
    //     }
    //     this.props.findMusician();
    //   }

      // findMusician = () =>{
      //     console.log("Musician ID: ")
      //     console.log(this.props.user_id);
      //       const results = this.state.musicians.filter(musician =>
      //       musician.user === this.props.user_id)
      //       if(results.length !== 0){
      //           this.setState({
      //               existingMusician: true
      //           });
      //           console.log(results);
      //           console.log(this.state.existingMusician)
      //       }
      // }

    render() { 
        return ( 
            <div>
                {this.state.existingMusician ?
                <h1>exists</h1>
                :
                <MusicianRegister user_id={this.props.user_id} musicianRegistered={this.musicianRegistered} findMusician={this.findMusician} getAllMusicians={this.getAllMusicians}/>
            }
            </div>
         );
    }
}
 
export default Musician;