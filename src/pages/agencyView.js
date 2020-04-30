import React, { Component } from "react";

//0x2b8481312dee0c375f6ecce970aca0bf1b86dfdc

import { Card, Grid, Input, Segment, Pagination, Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";

function mapStateToProps(state) {
   console.log(state)
   return {
      userAddress: state.userAddress,
      chain: state.chain
   };
}

class AgencyView extends Component {
  state={
     inspectionAddress: "",
     userAddress: "",
     violationTable: [],
     usrList: []
 }

   getUserList = async() => {
      let usrList = []
      console.log(this.props);
      let userNum = await this.props.chain.methods.userCount().call()
      for(let i = 0; i < userNum; i++) {
         try {
            let thisAddr = await this.props.chain.methods.userAddrs(i).call();
            usrList.push(thisAddr);
         } catch (err) {
            break;
         }
      }
      this.setState({usrList});
   }

   getOptionList() {
      let options = [];
      for(let i = 0; i < this.state.usrList.length; i++) {
         options.push({key:i,text:this.state.usrList[i]})
      }
      return(options)
   }

   componentDidMount = async() => {
      await this.getUserList();
   }

   onSelection = (e) =>
     this.setState({inspectionAddress: e.target.textContent},
     () => {console.log(this.state); console.log(this.props)})

   render() {
      this.options = this.getOptionList();
      return (
         <div>
           <h2> AGENCY VIEW </h2>
           <Dropdown
               placeholder='Select User Address'
               fluid
               selection
               onChange={this.onSelection}
               options={this.options}
            />
         </div>
      );
  }
}

export default connect(mapStateToProps)(AgencyView);
