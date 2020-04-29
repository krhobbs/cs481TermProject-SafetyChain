import React, { Component } from "react";
import { Card, Grid, Input, Segment, Pagination } from "semantic-ui-react";
import { connect } from "react-redux";

function mapStateToProps(state) {
   return {
      userAddress: state.userAddress
   };
}

// Still need to render violations here instead of location in App.js
class CustomerView extends Component {
   render() {
      return (
         <div>
             <h2>Customer Portal</h2>
             <h3>Violations: </h3>

        </div>
      );
  }
}

export default connect(mapStateToProps)(CustomerView);
