import React, { Component } from 'react';
import "./TitleBar.css"

class TitleBar extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
        <div className="titleBar">

            <h1>Gig Finder</h1>
        </div> 
        );
    }
}
 
export default TitleBar;