import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";

import { Menu, Header } from "semantic-ui-react";

function mapStateToProps(state) {
   console.log(state.userAddress);
  return {
    userAddress: state.userAddress,
    activeItem: "customerButton"
  };
}


// This renders the topbar on the webpage as well as the lines listing address and zombie count.

class TopBar extends Component {

  handleItemClick = (e, { name }) => this.setState({ activeItem: name})

  render() {
    const {activeItem} = this.props.activeItem;
    return (
      <div>
        <Menu style={{ marginTop: "10px", backgroundColor: "Gray" }}>

          <Menu.Item>
            <Link to={{ pathname: "/customerView"}}>
              <Button primary>Customer Portal</Button>
            </Link>
          </Menu.Item>

          <Menu.Item>
            <Link to={{ pathname: "/agencyView"}}>
              <Button primary>Agency Portal</Button>
            </Link>
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
