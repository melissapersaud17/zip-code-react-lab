import './App.css';
import React, { Component } from 'react';

function Zip({zip}){
  return ( //this outputs the zip code 
    <div>
      {zip} 
    </div>
  );
}

function CitySearchField(props){
  return(
    <div>
      City: 
      <input type="text" onChange ={props.ChangeHandler}/>
    </div>
  )
}


class App extends Component {

  state = {
    city: '', //we don't know what the city name will be
    zipCode:[], //we are going to take all the zipcodes from the city search and input into the array
  }


  cityChanged = (event) =>{
    this.setState({city: event.target.value});
    fetch('http://ctp-zip-api.herokuapp.com/city/SPRINGFIELD')
    .then((res) => res.json())
    .then(data => {
      this.setState({zipCode:data});
      console.log(this.state.zipCode);
    });
  };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>City Search</h2>
        </div>
        <CitySearchField city={this.state.city} ChangeHandler={this.cityChanged}/>
        <div>
          {
            this.state.zipCode.map(zip => <Zip zip={zip} />)
          }
        </div>
      </div>
      
    );
  }
}


export default App;
