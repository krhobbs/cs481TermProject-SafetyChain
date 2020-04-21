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

  getSpeed(){
    var positionOptions = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }
    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    let currentState = this;
    navigator.geolocation.watchPosition(function(position){
      let mphSpeed = position.coords.speed * 2.23694;
      currentState.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        speed: mphSpeed.toPrecision(3)
      });
      console.log(position.speed);
    }, error, positionOptions);
  }

  componentDidMount() {
   this.getSpeed();
  }


  displayViolations() {
    return this.state.violations.map((violation) =>
        <Violation speed={violation.speed} speedLimit={violation.speedLimit} date={violation.date} lat={violation.lat} lon={violation.lon} />
    );
  }

  render () {
    return (
        <div className="App">
          <Speed speed={this.state.speed} speedLimit={this.state.speedLimit} longitude={this.state.longitude} latitude = {this.state.latitude}/>
          {this.displayViolations()}
        </div>
    );
  }
}

export default App;
