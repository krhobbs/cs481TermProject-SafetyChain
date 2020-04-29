import React, { Component } from "react";
import { Card, Grid, Input, Segment, Pagination } from "semantic-ui-react";
import { connect } from "react-redux";

function mapStateToProps(state) {
   return {
      userAddress: state.userAddress
   };
}

class AgencyView extends Component {
   render() {
      return (
         <div>
           <h2> AGENCY VIEW </h2>
         </div>
      );
  }
}

export default connect(mapStateToProps)(AgencyView);
