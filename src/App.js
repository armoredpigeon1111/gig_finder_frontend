import React, { Component } from 'react';
import Register from './components/Register/Register';
import { Redirect, Route, Switch} from "react-router";
import {BrowserRouter} from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 

      <div>
        <BrowserRouter>
          <Switch>
            <Route path = "/register" component={Register}/>
          </Switch>
        </BrowserRouter>
      </div>

     );
  }
}
 
export default App;