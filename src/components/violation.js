import React, { Component } from 'react';

class Violation extends Component {

    render () {
        return (
            // Want to display speed, speedLimit, location, and time of the incident
            <div className="violation">
                <p id="speedInfo" className="violationInfo">Speed: {this.props.speed} mph</p>
                <p id="speedLimitInfo" className="violationInfo">Speed Limit: {this.props.speedLimit} mph</p>
                <p id="dateInfo" className="violationInfo">Date: {this.props.date.getMonth() + 1}-{this.props.date.getDate()}-{this.props.date.getFullYear()}</p>
                <p id="timeInfo" className="violationInfo">Time: {this.props.date.getHours()}:{this.props.date.getMinutes()}</p>
                <p id="locationInfo" className="violationInfo">Location: {this.props.lat}, {this.props.lon}</p>
            </div>
        );
    }
}

export default Violation;