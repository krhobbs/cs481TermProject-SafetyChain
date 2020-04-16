import React, { Component } from 'react';
import './App.css';
import Violation from "./components/violation";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: 0,
      longitude: 0,
      speed: 0,
      speedLimit: 60,
      violations: [] // List of violation objects containing: speed, speedLimit, date, lat, lon
    }
  }

  componentDidMount() {
    let currentState = this;

    navigator.geolocation.watchPosition(function(position) {
      currentState.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      console.log(position.speed);
    });
  }

  displayViolations() {
    return this.state.violations.map((violation) =>
        <Violation speed={violation.speed} speedLimit={violation.speedLimit} date={violation.date} lat={violation.lat} lon={violation.lon} />
    );
  }

  render () {
    return (
        <div className="App">
          <h4>Your latitude: {this.state.latitude}</h4>
          <br />
          <h4>Your longitude: {this.state.longitude}</h4>
          {this.displayViolations()}
        </div>
    );
  }
}

export default App;
