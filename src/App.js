import React, { Component } from 'react';
import './App.css';
import getWeb3 from "./utils/getWeb3";
import initBlockchain from "./utils/initBlockchain"
import Violation from "./components/violation";
import Speed from "./components/speed";
import TopBar from "./components/topbar";
import Welcome from "./pages/welcome"
import CustomerView from "./pages/customerView"
import AgencyView from "./pages/agencyView"

import { HashRouter, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import { Provider } from "react-redux";
import { Button } from "semantic-ui-react";

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
      userAddress: "",
      chain: null
    }
  }

  logOnChain(){
    this.state.violations.forEach((violation) => {
      this.state.chain.methods.logInfraction(violation.speedLimit, violation.speed, violation.date, violation.latitude, violation.longitude).send({from: this.state.userAddress})
    })
  }

  fakeInfraction(){
    let currentViolations = this.state.violations;

    currentViolations.push({
      speed: 80,
      speedLimit: 65,
      date: new Date().getTime(),
      latitude: 50,
      longitude: 135
    });
    this.setState({violations: currentViolations})
    this.logOnChain();
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
        date: new Date().getDay(),
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
      this.state.chain = data.chain;
      console.log(data)
      console.log(this.state.chain)
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
        <HashRouter>
          <Container>
           <div className="App">
             <TopBar state={this.state} />
             <Speed speed={this.state.speed} speedLimit={this.state.speedLimit} longitude={this.state.longitude} latitude={this.state.latitude}/>
             <Button onClick = {() => this.fakeInfraction()}> Demo Infraction </Button>
           </div>
            <Route exact path="/" component={Welcome} />
            <Route exact path="/customerView" component={CustomerView} />
            <Route exact path="/agencyView" component={AgencyView} />
            <Route exact path="/welcome" component ={Welcome} />
          </Container>
        </HashRouter>
      </Provider>
    );
  }
}
export default App;
