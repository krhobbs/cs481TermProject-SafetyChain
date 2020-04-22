import React, { Component } from 'react';

class Violation extends Component {

    render () {
        return (
            // Want to display speed, speedLimit, location, and time of the incident
            <div className="violation">
                <h4>Your latitude: {this.props.lat}</h4>
                <br />
                <h4>Your longitude: {this.props.lon}</h4>
            </div>
        );
    }
}

export default Violation;