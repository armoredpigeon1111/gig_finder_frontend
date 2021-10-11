import React, { Component } from 'react';
import axios from 'axios';

class Musician extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            musicians: [],
            existingMusician: false,
         }
    }

    componentDidMount(){
        this.getAllMusicians();
        
    }

    getAllMusicians = async () => {
        try{
          const jwt = localStorage.getItem('token');
          let response = await axios.get(`http://127.0.0.1:8000/api/musicians/`, {headers: {Authorization: 'Bearer ' + jwt}});
          this.setState({
            musicians: response.data
          });
          console.log(this.state.musicians);
        }
        catch(error){
          console.log(error);
        }
        this.findMusician();
      }

      findMusician = () =>{
            const results = this.state.musicians.filter(musician =>
            musician.user === this.props.user_id)
            if(results !== ''){
                this.setState({
                    existingMusician: true
                });
                console.log(results);
                console.log(this.state.existingMusician)
            }

      }

    render() { 
        return ( 
            <div>
                {this.state.existingMusician ?
                <h1>exists</h1>
                :
                <h1>does not exist</h1>
            }
            </div>
         );
    }
}
 
export default Musician;