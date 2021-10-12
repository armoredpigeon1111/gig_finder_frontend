import React, { Component } from 'react';
import axios from 'axios';

class CreateGig extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            musicians: [],
            musician_id : 0,
         }
    }

    componentDidMount(){
        this.getAllMusicians();
    }

    findMusician = () =>{
        console.log("User ID: ")
        console.log(this.props.user_id);
          const results = this.state.musicians.filter(musician =>
          musician.user === this.props.user_id)
          if(results.length !== 0){
              this.setState({
                  musician_id: results[0].id
              });             
          }
      }
      
      getAllMusicians = async () => {
        try{
          const jwt = localStorage.getItem('token');
          let response = await axios.get(`http://127.0.0.1:8000/api/musicians/`, {headers: {Authorization: 'Bearer ' + jwt}});
          this.setState({
            musicians: response.data
          });
          console.log("getAllMusicians");
          console.log(this.state.musicians);
        }
        catch(error){
          console.log(error);
        }
        this.findMusician();
      }

    render() { 
        return ( 
            <div>

            </div>
         );
    }
}
 
export default CreateGig;