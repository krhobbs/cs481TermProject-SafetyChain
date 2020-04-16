import React, { Component } from 'react';

class Speed extends Component {


    render () {
        return (
            // Want to display the speed over speed limit, passed as props
            <div className="speed">
                <h1>{this.props.speed} / <span style={{fontSize: "12px"}}>{this.props.speedLimit} mph</span></h1>
            </div>
        );
    }
}

export default Speed;
