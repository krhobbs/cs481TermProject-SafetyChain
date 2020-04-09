import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: 0,
      longitude: 0
    }
  }

  componentDidMount() {
    let currentState = this;

    navigator.geolocation.watchPosition(function(position) {
      currentState.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
      console.log("Latitude is ", position.coords.latitude);
      console.log("Longitude is ", position.coords.longitude);
    });
  }

  render () {
    return (
        <div className="App">
          <h4>Your latitude: {this.state.latitude}</h4>
          <br />
          <h4>Your longitude: {this.state.longitude}</h4>

        </div>
    );
  }
}

export default App;
