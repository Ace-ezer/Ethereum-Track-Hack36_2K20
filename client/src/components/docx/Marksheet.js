import React, { Component, Fragment } from 'react';
import tenthContract from '../../tenthContract';
import web3 from '../../web3';
import storeHash from '../../storehash';

export default class Marksheet extends Component {
    state = {
        account: '',
        digiId: null,
        isDataReady: true,
        marksheetData: {},
        RollNo: null
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

            var test = false;
            const data = await tenthContract.methods.getTenthDetails(digiId).call({
                from: this.state.account
            },(err,tx) => {
                if(tx === undefined)
                    this.setState({
                        isDataReady: false
                    });
            });

            this.setState({
                marksheetData: data,
                RollNo: data.RollNo
            });
    }

    render() {
        var data = this.state.marksheetData;
        return (
            this.state.isDataReady ? (
                <Fragment>
                <h3 className='userData title'>Roll Number: {this.state.RollNo}</h3>
                    <div className='userData'>
                        <h3 className='title1'>Marksheet (Boards)</h3>
                        <center><hr /></center>
                        <b className='title'>Name:</b>{this.state.marksheetData.name}<br />
                        <b className='title'>Father's name:</b>{this.state.marksheetData.guardian}<br />
                        <b className='title'>DOB:</b>{this.state.marksheetData.dob}<br />
                        <b className='title'>Board:</b>{this.state.marksheetData.board}<br />
                        <b className='title'>Percentile:</b>{this.state.marksheetData.percent}<br/>
                    </div>
            </Fragment>):('')
        );
    }
}