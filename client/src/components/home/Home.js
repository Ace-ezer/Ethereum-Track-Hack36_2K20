import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import AdminHome from '../adminHome/AdminHome';
import Profile from '../profile/Profile';

import storeHash from '../../storehash'; 
import '../../css/homeStyles.css';

export default class Home extends Component {

  state = {
    digiId: null,
    userData: {},
    searchInput: '',
    searchFlag: false,
    isSet: false
  };


  // Handle form submission by the admin
  onSubmit = async (event) => {
    event.preventDefault();
    const formData = event.target;
    console.log(formData.name.value + " " + formData.gender.value);

    const eaddr = formData.addr.value.toString();
    const name = formData.name.value.toString();
    const gender = formData.gender.value.toString();
    const dob = formData.dob.value.toString();
    const address = formData.address.value.toString();
    const phone = formData.phone.value.toString();

    console.log("Address " + eaddr);
    console.log("Name" + name);
    console.log("gender " + gender);
    console.log("phone " + phone);

    // Get DigiId returned from a function
    const digiId = await storeHash.methods.registerUser(eaddr, name, gender, dob, address, phone).call({
      from: this.props.adminAccount
    });

    this.setState({
      digiId: digiId,
      isSet: true
    });

    // Register the user and store their information on Blockchain
    await storeHash.methods.registerUser(eaddr, name, gender, dob, address, phone).send({
      from: this.props.adminAccount
    }, (err, transactionHash) => {
      console.log("Transaction Hash: " + transactionHash);
    });

    console.log(digiId);

    // Get the User info and display it.
    const userData = await storeHash.methods.searchUserBydigiId(digiId).call({
      from: this.props.account
    });

    console.log(userData);

    this.setState({
      userData: userData
    });
  }

 /* onMarksheetSubmit = async (event) => {
      event.preventDefault();
      const formData = event.target;

      const digiId = formData.digiId.value;
      const rollno = formData.rollno.value;
      const name = formData.name.value;
      const dob = formData.dob.value;
      const guardian = formData.guardian.value;
      const percent = formData.percent.value;
      const board = formData.board.value;

      await tenthContract.methods.setTenthDetails(digiId,rollno,name,dob,guardian,percent,true,board).call({
          from: this.props.adminAccount
      });
  }*/

  // Search and display the data using DigiId
  onSearch = async (event) => {
    event.preventDefault();

    const digiId = parseInt(event.target.digiId.value);

    this.setState({
      digiId: digiId,
      isSet: true,
      searchFlag: true
    });

    const userData = await storeHash.methods.searchUserBydigiId(digiId).call({
      from: this.props.account
    });

    console.log(userData);

    this.setState({
      userData: userData
    });
  }

  handleChange = (event) => {
    this.setState({
      searchInput: event.target.digiId
    });
  }

  onClearSearch = () => {
    this.setState({
      digiId: null,
      userData: {},
      searchInput: '',
      isSet: '',
      searchFlag: false
    })
  }

  render() {
    return (
      <div className='container'>
        <h5>Account: {this.props.account}</h5>
        {this.props.adminAccount === this.props.account ? (<AdminHome onSubmit={this.onSubmit} />) : (<span />)}
        {this.state.isSet ? (<h3 className='userData title'>DigiId: {this.state.digiId}</h3>) : (<span></span>)}
        <br />
        <div className='searchForm'>
        <h3 className='title'>Search...</h3>
        <hr/>
          <form onSubmit={this.onSearch}> 
            <input type='text' name='digiId' placeholder='Search User...' value={this.state.searchInput} onChange={this.handleChange} />
            <input type='submit' name='submit' hidden/>
          </form>
        </div>
        <br />
        {this.state.searchFlag? (
          <div className='userData'>
            <h3 class='title1'>Digital Identity</h3>
            <center><hr /></center>
            <b class='title'>Name:</b>  {this.state.userData.name}<br />
            <b class='title'>Gender:</b>{this.state.userData.gender}<br />
             <b class='title'>DOB:</b>   {this.state.userData.dob}<br />
            <b class='title'>Address:</b> {this.state.userData.Address}<br />
            <b class='title'>Phone:</b>  {this.state.userData.phoneNumber}<br />
            <button name="clearSearch" onClick={this.onClearSearch}>Clear Results</button>
          </div>) : (<span></span>)}
      </div>
    );
  }
}
