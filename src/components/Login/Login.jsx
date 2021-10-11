import React, { Component } from 'react';
import Register from '../Register/Register';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            username: "",
            password: "",
            register: false,
         }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const credentials = {
            username: this.state.username,
            password: this.state.password,
        };
        this.props.loginUser(credentials);
    }

    registerToggle = (event) => {
        if (this.state.register === false)
        {
            this.setState({
                regiter: true
            });
        }
        else{
            this.setState({
                register: this.state.register} 
            );
        }
    }

    render() { 
        return ( 
            <div>
                {this.state.register ?
                
                <Register registerToggle = {this.registerToggle}/>
                
                :
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <label>Username:</label>
                    <input type="text" name="username" onChange={this.handleChange} value={this.state.username}/><br />
                    <label>Password:</label>
                    <input type="password" name="password" onChange={this.handleChange} value={this.state.password}/><br />
                    <button type="submit" >Login</button>
                    <button onClick = {this.registerToggle}>Register</button>
                </form>

                }
            </div>

         );
    }
}
 
export default Login;