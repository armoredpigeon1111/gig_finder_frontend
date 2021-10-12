import React, { Component } from 'react';
import axios from 'axios';

class MusicianRegister extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            bandName: "",
            genre: "",
         }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.createProfile();
    }

    createProfile = async () => {
        const profileInfo = {
            bandName:this.state.bandName,
            genre: this.state.genre,
            user: this.props.user_id
        }

        try{
          const jwt = localStorage.getItem('token');
          console.log(jwt);
          console.log(this.state.genre);
          let response = await axios.post(`http://127.0.0.1:8000/api/musicians/`, profileInfo, {headers: {Authorization: 'Bearer ' + jwt}} );

          console.log(response);
        }
        catch(error){
          console.log(error);
        }
        this.props.findMusician();
        this.props.musicianRegistered();
      }


    render() { 
        return ( 
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <label>Band Name:</label>
                <input type="text" name="bandName" onChange={this.handleChange} value={this.state.bandName} /><br />
                <label>Genre</label>
                <input type="text" name="genre" onChange={this.handleChange} value={this.state.genre} /><br />
                <button type="submit">Submit</button>
            </form>
         );
    }
}
 
export default MusicianRegister;