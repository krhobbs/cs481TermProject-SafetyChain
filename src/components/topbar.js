import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";

import { Menu, Header } from "semantic-ui-react";

function mapStateToProps(state) {
   console.log(state.userAddress);
  return {
    userAddress: state.userAddress,
  };
}

// This renders the topbar on the webpage as well as the lines listing address and zombie count.

class TopBar extends Component {
  render() {
    return (
      <div>
        <Menu style={{ marginTop: "10px", backgroundColor: "Salmon" }}>
          <Menu.Item>
            <Button>Customer? Click here to see your record</Button>
          </Menu.Item>

          <Menu.Item>
            <Button>Agent? Click here to review customer records</Button>
          </Menu.Item>

          <Menu.Item>
          </Menu.Item>

          <Menu.Item position="right">
          </Menu.Item>
        </Menu>
        <div className="center">
          <h2>Welcome to SafetyChain!</h2>
        </div>
        Your account address: {this.props.userAddress}
      </div>
    );
  }
}

export default connect(mapStateToProps)(TopBar);
