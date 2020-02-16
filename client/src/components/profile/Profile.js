import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';

import web3 from '../../web3';
import storeHash from '../../storehash';
import Marksheet from '../docx/Marksheet';

import "../../css/homeStyles.css";

export default class Profile extends Component { 
    state = {
        account: '',
        digiId: null,
        userData: {} 
    }

    async componentDidMount() {

        // Get user's MetaMask account address
        const accounts = await web3.eth.getAccounts();
        await this.setState({
            account: accounts[0]
        });

        // Checks whether the account has been changed
        var accountInterval = setInterval(function() {
            web3.eth.getAccounts()
                .then(account => {
                    if (accounts[0] !== account[0]) {
                        window.location.reload();
                    }
                });
        }, 100);
        console.log(this.state.account);
        const digiId = await storeHash.methods.getdigiIdByAddress().call({from: this.state.account});

        this.setState({
            digiId: digiId
        });

        const userData = await storeHash.methods.searchUserByaddress().call({from:this.state.account});

        console.log(userData);

        this.setState({
            userData: userData
        });
    }

    render() {
        return (
            <Fragment>
                <section className='container'>
                <div className='docx'>
                    <h3 className='userData title'>DigiId: {this.state.digiId}</h3>
                    <div className='userData'>
                        <h3 className='title1'>Digital Identity</h3>
                        <center><hr /></center>
                        <b className='title'>Name:</b>  {this.state.userData.name}<br />
                        <b className='title'>Gender:</b>{this.state.userData.gender}<br />
                        <b className='title'>DOB:</b>   {this.state.userData.dob}<br />
                        <b className='title'>Address:</b> {this.state.userData.Address}<br />
                        <b className='title'>Phone:</b>  {this.state.userData.phoneNumber}<br />
                    </div>
                </div>
                <div className='docx'> 
                    <Marksheet account={this.state.account} digiId={this.state.digiId}/>
                </div>
                </section>
            </Fragment>
        );
    }
}