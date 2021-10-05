import React, { Component } from "react";
import "./App.css";

function City({city}) {
  const {City,State} = city;
  const {Lat,Long} = city;
  const {EstimatedPopulation} = city;
  const {TotalWages} = city;
  return (
    <div>
      {City},{State}
      <ul>
        <li>State: {State}</li>
        <li>Location: ({Lat},{Long})</li>
        <li>Population(estimated): {EstimatedPopulation}</li>
        <li>Total Wages: {TotalWages}</li>
      </ul>
    </div>
  );
}

function ZipSearchField(props) {
  //we want to listen to every change the user types or we listen when a user clicks a submit button
  return (
    <div>
      ZipCode:
      <input type="text" onChange={props.changeHandler} />
    </div>
  );
}

  
//onChange is going to listen to whatever the user types

class App extends Component {
  state = {
    zipCode: '',
    cities: [],
  };

  zipChanged = (event) => {
    //gets the zipcode
    this.setState({ zipCode: event.target.value });
    fetch(`http://ctp-zip-api.herokuapp.com/zip/${event.target.value}`)
      .then((res) => res.json())
      .then(data => {
        this.setState({cities:data});
        console.log(this.state.cities);
      });
  };


  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField
          zipCode={this.state.zipCode}
          changeHandler={this.zipChanged}
        />
        
        <div>
          {
            this.state.cities.map(city => <City city={city}/>)
          }
        </div>
      </div>
    );
  }
}

export default App;
//We don't want to hardcode the cities, we want it to be dynamic - we display the number of cities based on the API
