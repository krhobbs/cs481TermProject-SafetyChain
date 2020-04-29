import React, { Component } from "react";
import { Card, Grid, Input, Segment, Pagination } from "semantic-ui-react";
import { connect } from "react-redux";


function mapStateToProps(state) {
    return {
        userAddress: state.userAddress
    };
}

class Welcome extends Component {
    render() {
        return (
            <div>
                <h2> About SafetyChain </h2>
                <h3>SafetyChain is an application designed to use location data to check for speeding. It is unique in that it records are stored in the blockchain, and thus cannot be changed by anyone, allowing for fair and transparent records between the client and the agent. </h3>
                <h3>Customers: to check past speeding violations, use the "Customer Portal". </h3>
                <h3>Agents: use the "Agency Portal" to get started. </h3>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Welcome);
