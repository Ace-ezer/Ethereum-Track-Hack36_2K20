import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../css/NavStyles.css';
import storeHash from '../../storehash';

export default class Navbar extends Component {

    state = {
        isUser: false
    }

    async onLoad() {
        const isregistered = await storeHash.methods.isUser().call({
            from: this.props.account
        });

        console.log(isregistered);
        this.setState({
            isUser: isregistered
        });
    }


    render() {
        this.onLoad();
        return (
            <nav className="navbar">
                <h1>
                    <Link to="/"><span>Neo | Dapp</span></Link>
                </h1>
                <ul>
                    <li>
                        <Link to="/"><span>Home</span></Link>
                    </li>
                    {this.state.isUser ? (
                        <li><Link to="/profile"><span>Profile</span></Link></li>
                    ) : ('')}
                </ul>
            </nav>
        );
    }
} 