import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            username: "",
            password: "",
            email: "",
            isMusician: false,
         }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.registerUser();
        this.props.registerToggle();
    }

    registerUser = async () => {
        // debugger;
        const registrationInfo = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            is_musician: this.state.isMusician,
        }

        try{
            let response = await axios.post("http://127.0.0.1:8000/api/auth/register/", registrationInfo);
            console.log(response);
        }
        catch{
            console.log("Unsuccessful Registration");
        }
    };

    render() { 
        return ( 
            <div>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <label>Username:</label>
                    <input type="text" name="username" onChange={this.handleChange} value={this.state.username}/><br />
                    <label>Password:</label>
                    <input type="password" name="password" onChange={this.handleChange} value={this.state.password}/><br />
                    <label>Email:</label>
                    <input type="email" name="email" onChange={this.handleChange} value={this.state.email}/><br />
                    <input type="checkbox" name="isMusician" checked={this.state.isMusician} onChange={this.handleChange} />
                    <label>I'm a Musician</label><br />
                    <button type="submit">Register</button>
                </form>
            </div>
         );
    }
}
 
export default Register;