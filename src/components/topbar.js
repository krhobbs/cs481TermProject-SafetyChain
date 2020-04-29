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
          <div className="center">
              <h2>Welcome to SafetyChain!</h2>
          </div>
          Your account address: {this.props.userAddress}
        <Menu style={{ marginTop: "10px", backgroundColor: "Blue" }}>
            <Menu.Item>
                <Link to={{ pathname: "/welcome"}}>
                    <Button color="Grey">About</Button>
                </Link>
            </Menu.Item>

          <Menu.Item>
            <Link to={{ pathname: "/customerView"}}>
              <Button color="Grey">Customer Portal</Button>
            </Link>
          </Menu.Item>

          <Menu.Item>
            <Link to={{ pathname: "/agencyView"}}>
              <Button color = "Grey">Agency Portal</Button>
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default connect(mapStateToProps)(TopBar);
