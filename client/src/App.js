import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
import Home from './components/home/Home';
import Profile from './components/profile/Profile';
import Uploads from './components/uploads/Uploads';
import './App.css';
import web3 from './web3';

export default class App extends Component {
    state = {
        adminAccount: '0xEe2F4d0E3846E3916bC79d9BfeA88AE246d1fD67',
        account: ''
    }

    onload = async() => {
        console.log("Welcome " + this.state.account);
    }

    async componentDidMount() {

        // Get user's MetaMask account address
        const accounts = await web3.eth.getAccounts();
        await this.setState({
            account: accounts[0]
        });
        console.log(accounts[0]);
        // Load information of the current account
        this.onload();

        // Checks whether the account has been changed
        var accountInterval = setInterval(function() {
            web3.eth.getAccounts()
                .then(account => {
                    if (accounts[0] !== account[0]) {
                        window.location.reload();
                    }
                });
        }, 100);
    }

    render() {
            return ( <Router >
                    <Fragment >
                    <Navbar adminAccount = { this.state.adminAccount } account = { this.state.account }/>
                     <Switch >
                    <Route exact path = '/' render = {(props) => < Home {...props } adminAccount = { this.state.adminAccount } account = { this.state.account }/>} />
                    <Route exact path = '/profile' render = {(props) => < Profile {...props } adminAccount = { this.state.adminAccount }account = { this.state.account }/>} / >
                    <Route exact path = '/uploads' render ={(props) => < Uploads {...props } adminAccount = { this.state.adminAccount }account = { this.state.account }/>} / >
                    </Switch>
                    </Fragment>
                    </Router>
                            );
                        }
                    }