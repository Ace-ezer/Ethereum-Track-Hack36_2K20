import React, { Component, Fragment } from 'react';
import tenthContract from '../../tenthContract';
import storehash from '../../storehash';
import web3 from '../../web3';
import storeHash from '../../storehash';

export default class Marksheet extends Component {
    state = {
        account: '',
        digiId: null, 
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
    }

    render() {
        return (
            <Fragment>
                <h3 className='userData title'>Roll Number: {this.state.RollNo}</h3>
                    <div className='userData'>
                        <h3 className='title1'>Marksheet (Boards)</h3>
                        <center><hr /></center>
                        <b className='title'>Name:</b>Arpit<br />
                        <b className='title'>Father's name:</b>YM singh yadav<br />
                        <b className='title'>DOB:</b>07/07<br />
                        <b className='title'>Board:</b>CBSE<br />
                        <b className='title'>Percentile:</b>92<br/>
                    </div>
            </Fragment>
        );
    }
}