import React, { Component } from 'react';
import axios from 'axios';

class FanHome extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            fans: [],
            fan_id: 0, 
            genre1: "",
            genre2: "",
            genre3: "",
         }
    }

    componentDidMount(){
        this.getAllFans();
    }

    getAllFans = async () => {
        try{
          const jwt = localStorage.getItem('token');
          let response = await axios.get(`http://127.0.0.1:8000/api/fans/`, {headers: {Authorization: 'Bearer ' + jwt}});
          this.setState({
            fans: response.data
          });
          
        }
        catch(error){
          console.log(error);
        }
        this.findFan();
        this.getGenres();
      }

    //Get matching fan ID
    findFan = () =>{
          const results = this.state.fans.filter(fan =>
          fan.user === this.props.user_id)
          if(results.length !== 0){
              this.setState({
                  fan_id: results[0].id
              });                       
          } 
      }

    //Get user Genres
    getGenres = async () => {
        console.log("getGenresFan");
        console.log(this.state.fan_id);
        try{
          const jwt = localStorage.getItem('token');
          let response = await axios.get(`http://127.0.0.1:8000/api/fans/${this.state.fan_id}/`, {headers: {Authorization: 'Bearer ' + jwt}});
          this.setState({
            genre1: response.data[0].genre1,
            genre2: response.data[0].genre2,
            genre3: response.data[0].genre3
          });
          console.log("getGenres")
          console.log(response.data[0].genre1);
        }
        catch(error){
          console.log(error);
        }
        this.findFan();
      }

    render() { 
        return ( 
            <div>
                
            </div>
         );
    }
}
 
export default FanHome;