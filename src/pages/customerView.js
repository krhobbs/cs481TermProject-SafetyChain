import React, { Component } from "react";
import { Card, Grid, Input, Segment, Pagination } from "semantic-ui-react";
import { connect } from "react-redux";

function mapStateToProps(state) {
    console.log(state)
    return {
        userAddress: state.userAddress,
        chain: state.chain
    };
}

class CustomerView extends Component {
    state={
        inspectionAddress: "",
        userAddress: "",
        violationTable: []
    }

    componentDidMount = async() => {
        await this.callLocal();
    }


    updateViolationTable = async() => {
        let violationCards = []
        let numViolations = await this.props.chain.methods.userInfractionCount(this.state.inspectionAddress).call();
        let userViolations = await this.props.chain.methods.getInfractionsByUser(this.state.inspectionAddress).call();
        for(let i = 0; i < numViolations; i++) {
            let thisViolation = await this.props.chain.methods.infractions(userViolations[i]).call();
            let lat = thisViolation.latitude>>0;
            let lon = thisViolation.longitude>>0;
            console.log(thisViolation)
            violationCards.push(
                <Card fluid color='red'>
                    <Card.Content>
                        <Card.Header>Speed Violation</Card.Header>
                        <Card.Description>
                            {thisViolation.speed} MPH / {thisViolation.limit} MPH
                            <hr/>
                            {lat} latitude  {lon} longitude

                        </Card.Description>
                    </Card.Content>
                </Card>
            )
        }
        this.setState({violationTable: violationCards})
    }

    callLocal = async() => {
        await this.setState({inspectionAddress: this.props.userAddress})
        await this.updateViolationTable();
    }


    render() {
        return (
            <div>
                <h2> Customer Portal </h2>
                <h3> Violations: </h3>
                <Card.Group> {this.state.violationTable} </Card.Group>
            </div>
        );
    }
}

export default connect(mapStateToProps)(CustomerView);
