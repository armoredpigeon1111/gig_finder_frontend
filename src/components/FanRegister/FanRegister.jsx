import React, { Component } from 'react';
import axios from 'axios';

class FanRegister extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            genre1: "",
            genre2: "",
            genre3: "",
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
        this.props.findFanExist();
        this.props.findFan();
        this.props.setExistingFan();
    }

    createProfile = async () => {
        const profileInfo = {
            genre1: this.state.genre1,
            genre2: this.state.genre2,
            genre3: this.state.genre3,
            user: this.props.user_id
        }

        try{
          const jwt = localStorage.getItem('token');
          console.log(jwt);
          console.log(this.state.genre);
          let response = await axios.post(`http://127.0.0.1:8000/api/fans/`, profileInfo, {headers: {Authorization: 'Bearer ' + jwt}} );

          console.log(response);
        }
        catch(error){
          console.log(error);
        }

      }


    render() { 
        return ( 

            <div>
            <h1>Select your favorite genres</h1>
            <div className="d-flex container justify-content-start align-items-center">
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <div className = "row mb-3">
                        <label>Genre 1</label>
                        <input type="text" name="genre1" onChange={this.handleChange} value={this.state.genre1} /><br />
                    </div>
                    <div className = "row mb-3">    
                        <label>Genre 2</label>
                        <input type="text" name="genre2" onChange={this.handleChange} value={this.state.genre2} /><br />
                    </div>
                    <div className = "row mb-3">    
                        <label>Genre 3</label>
                        <input type="text" name="genre3" onChange={this.handleChange} value={this.state.genre3} /><br />
                    </div>
                    <div className = "row mb-3">
                        <div className="col-sm-10 col-auto">    
                        <button className="btn btn-primary" type="submit">Submit</button>
                        </div>
                    </div>    
                </form>
            </div>
            </div>
         );
    }
}
 
export default FanRegister;