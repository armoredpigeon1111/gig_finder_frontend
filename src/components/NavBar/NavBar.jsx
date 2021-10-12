import React, { Component } from 'react';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    logoutUser = () =>{
        this.props.logoutUser();
    }

    render() { 

        if(this.props.user){
            return ( 
                <div>
                    <button onClick={() => this.logoutUser()}>Logout</button>
                </div>
             );
        }
        else{
            return(null);
        }
    }
}
 
export default NavBar;