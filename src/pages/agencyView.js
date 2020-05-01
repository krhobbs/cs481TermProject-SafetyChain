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
         options.push({key:i,text:this.state.usrList[i],value:this.state.usrList[i]})
      }
      return(options)
   }

   componentDidMount = async() => {
      await this.getUserList();
   }


   updateViolationTable = async() => {
      let violationCards = []
      let numViolations = await this.props.chain.methods.userInfractionCount(this.state.inspectionAddress).call();
      let userViolations = await this.props.chain.methods.getInfractionsByUser(this.state.inspectionAddress).call();
      for(let i = 0; i < numViolations; i++) {
         let thisViolation = await this.props.chain.methods.infractions(userViolations[i]).call();
         let lat = thisViolation.latitude>>0;
         let lon = thisViolation.longitude>>0;
         let timemilli = parseInt(thisViolation.datetime);
         let stringtime = new Date(timemilli);
         console.log(thisViolation)
         violationCards.push(
            <Card fluid color='red'>
               <Card.Content>
                  <Card.Header>Speed Violation</Card.Header>
                  <Card.Description>
                     {thisViolation.speed} MPH / {thisViolation.limit} MPH
                     <hr/>
                     {lat} latitude  {lon} longitude
                     <hr/>
                     {stringtime.toString()}

                  </Card.Description>
               </Card.Content>
            </Card>
         )
      }
      this.setState({violationTable: violationCards})
   }

   onSelection = async(e, {value}) => {
        await this.setState({inspectionAddress: value})
        await this.updateViolationTable();
   }


   render() {
      const options = this.getOptionList();
      return (
         <div>
           <h2> AGENCY VIEW </h2>
           <Dropdown
               placeholder='Select User Address'
               fluid
               selection
               onChange={this.onSelection}
               options={options}
            />
            <br /> <br />
            <Card.Group> {this.state.violationTable} </Card.Group>
         </div>
      );
  }
}

export default connect(mapStateToProps)(AgencyView);
