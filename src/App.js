import React, { Component } from 'react';
import './App.css';
import Violation from "./components/violation";
import Speed from "./components/speed";

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
          <Speed speed={this.state.speed} speedLimit={this.state.speedLimit} />
          {this.displayViolations()}
        </div>
    );
  }
}

export default App;
