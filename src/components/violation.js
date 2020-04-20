import React, { Component } from 'react';

class Violation extends Component {

    render () {
        return (
            // Want to display the speed over speed limit, passed as props
            <div className="violation">
                <h4>Your latitude: {this.state.latitude}</h4>
                <br />
                <h4>Your longitude: {this.state.longitude}</h4>
            </div>
        );
    }
}

export default Violation;