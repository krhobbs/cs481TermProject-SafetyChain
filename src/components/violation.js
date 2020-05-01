import React, { Component } from 'react';

class Violation extends Component {

    render () {
        return (
            // Want to display speed, speedLimit, location, and time of the incident
            <div className="violation">
                <p id="speedInfo" className="violationInfo">Speed: {this.props.speed} mph</p>
                <p id="speedLimitInfo" className="violationInfo">Speed Limit: {this.props.speedLimit} mph</p>
                <p id="locationInfo" className="violationInfo">Location: {this.props.lat}, {this.props.lon}</p>
            </div>
        );
    }
}

export default Violation;