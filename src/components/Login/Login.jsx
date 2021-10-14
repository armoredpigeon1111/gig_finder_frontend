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
        console.log("Register Toggle");
        if (this.state.register == false)
        {
            this.state.register=true;
            this.setState({
                regiter: true
            });
        }
        else{
            this.state.register=false;
            this.setState({
                register: false} 
            );
        }
        console.log(this.state.register);
    }

    render() { 
        return ( 
            <div>
                {this.state.register ?
                
                <Register registerToggle = {this.registerToggle}/>
                
                :
                
                <div className="d-flex container justify-content-center align-items-center">    
                <form className="form-group" onSubmit={(event) => this.handleSubmit(event)}>
                    <div className="row mb-3">
                        <label>Username:</label>
                        <div className="col-sm-10">
                            <input type="text" name="username" onChange={this.handleChange} value={this.state.username}/><br />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label>Password:</label>
                        <div className="col-sm-10">
                            <input type="password" name="password" onChange={this.handleChange} value={this.state.password}/><br />
                        </div>    
                    </div>    
                    <button className="btn btn-primary" type="submit" >Login</button>
                    <button className="btn btn-secondary" onClick={() => this.registerToggle()}>Register</button>
                </form>
                
                
                </div>
                }
                
            </div>

         );
    }
}
 
export default Login;