import React, { Component } from 'react';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            username: "",
            password: "",
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

    render() { 
        return ( 
            <div>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <label>Username:</label>
                    <input type="text" name="username" onChange={this.handleChange} value={this.state.username}/><br />
                    <label>Password:</label>
                    <input type="password" name="password" onChange={this.handleChange} value={this.state.password}/><br />
                    <button type="submit" >Login</button>
                </form>
            </div>

         );
    }
}
 
export default Login;