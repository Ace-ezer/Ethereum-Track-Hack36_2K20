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

  /*captureFile = (event) => {
  
  console.log(event);
  event.stopPropagation();
  event.preventDefault();
  
  const file = event.target.files[0];
  let reader = new window.FileReader();
  reader.readAsArrayBuffer(file);
  reader.onloadend = () => this.convertToBuffer(reader);
  }; // CaptureFile
  
  convertToBuffer = async (reader) => {
  // File is converted to Buffer for upload to IPFS
  const buffer = await Buffer.from(reader.result);
  // Set this buffer using ES6 syntax
  this.setState({
      buffer: buffer
  });
  };
  
  onSubmit = async (event) => {
  event.preventDefault();
  
  // Get user's MetaMask account address
  //const accounts = await web3.eth.getAccounts();
  
  console.log("Sending Metamask account: " + this.state.account);
  
  // Obtain contract address from storehash.js
  const ethAddress = await storeHash.options.address;
  this.setState({
      ethAddress
  });
  
  // Save document to IPFS,return its hash#, and set hash# to state
  await ipfs.add(this.state.buffer, async (err, ipfsHash) => {
      //console.error(err);
      //console.log(ipfsHash);
  
      // setState by setting ipfsHash to ipfsHash[0].hash 
      var id = this.state.ipfsHash.push(ipfsHash[0].hash) - 1;
      this.setState({
      ipfsHash: this.state.ipfsHash
      });
  
      // Call Ethereum contract method "sendHash" and .send IPFS hash to etheruem contract 
      // Return the transaction hash from the ethereum contract
  
      await storehash.methods.setHash(this.state.ipfsHash[id].toString()).send({
      from: this.state.account
      }, (err, transactionHash) => {
      console.log(transactionHash);
      });
  });
  };*/

  render() {
    return (
      <div className='container'>
        <h5>Account: {this.props.account}</h5>
        {this.props.adminAccount === this.props.account ? (<AdminHome onSubmit={this.onSubmit} />) : (<span />)}
        {this.state.isSet ? (<h3 className='userData title'>DigiId: {this.state.digiId}</h3>) : (<span></span>)}
        <br />
        <div className='searchForm'>
        <h3 class='title'>Search...</h3>
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
