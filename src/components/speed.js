import React, { Component } from 'react';

class Speed extends Component {



    render () {
        return (
            // Want to display the speed over speed limit, passed as props
            //Coordinates added for testing purposes
            <div className="speed">
                <h1>{this.props.speed} mph / <span style={{fontSize: "12px"}}>{this.props.speedLimit} mph</span></h1>
                <h1>{this.props.latitude} , {this.props.longitude}</h1>
            </div>
        );
    }
}

export default Speed;
