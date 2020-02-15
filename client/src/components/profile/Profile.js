import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';

import web3 from '../../web3';
import storeHash from '../../storehash';

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
                <h3 className='userData title'>DigiId: {this.state.digiId}</h3>
                <div className='userData'>
                    <h3 class='title1'>Digital Identity</h3>
                    <center><hr /></center>
                    <b class='title'>Name:</b>  {this.state.userData.name}<br />
                    <b class='title'>Gender:</b>{this.state.userData.gender}<br />
                    <b class='title'>DOB:</b>   {this.state.userData.dob}<br />
                    <b class='title'>Address:</b> {this.state.userData.Address}<br />
                    <b class='title'>Phone:</b>  {this.state.userData.phoneNumber}<br />
                </div>
                </section>
            </Fragment>
        );
    }
}