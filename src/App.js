import React, { Component } from 'react';
import './App.css';
import getWeb3 from "./utils/getWeb3";
import initBlockchain from "./utils/initBlockchain"
import Violation from "./components/violation";
import Speed from "./components/speed";
import TopBar from "./components/topbar";


import { HashRouter, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import { Provider } from "react-redux";

import store from "./redux/store";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: 0,
      longitude: 0,
      speed: 0,
      speedLimit: 65,
      violations: [], // List of violation objects containing: speed, speedLimit, date, lat, lon
      userAddress: ""
    }
  }

  getSpeed() {
    let positionOptions = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    let currentState = this;

    navigator.geolocation.watchPosition(function(position) {
      let mphSpeed = position.coords.speed * 2.23694;
      currentState.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        speed: mphSpeed.toPrecision(3)
      });
      console.log(position.speed);
    }, error, positionOptions);
  }

  checkSpeed() {
    let currentViolations = this.state.violations;
    let speed = this.state.speed;
    let speedLimit = this.state.speedLimit;

    if (speed > speedLimit) {
      currentViolations.push({
        speed: speed,
        speedLimit: speedLimit,
        date: new Date(),
        latitude: this.state.latitude,
        longitude: this.state.longitude
      });
    }

    this.setState({violations: currentViolations})
  }

  componentDidMount = async() => {
    this.getSpeed();
    this.timer = setInterval(
        () => this.checkSpeed(), 30000
    );
    try {
      const web3 = await getWeb3();
      const data = await initBlockchain(web3);
      this.state.userAddress = data.userAddress;
      console.log(data)
      console.log(this.state)
   } catch (error){
      alert(error);
   }
  }


  displayViolations() {
    return this.state.violations.map((violation) =>
        <Violation speed={violation.speed} speedLimit={violation.speedLimit} date={violation.date} lat={violation.latitude} lon={violation.longitude} />
    );
  }

  render () {
    return (
      <Provider store={store}>
        <div className="App">
          <TopBar state={this.state} />
          <Speed speed={this.state.speed} speedLimit={this.state.speedLimit} longitude={this.state.longitude} latitude={this.state.latitude}/>
          {this.displayViolations()}
        </div>
      </Provider>
    );
  }
}

export default App;
