import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';

import web3 from '../../web3';
import storeHash from '../../storehash'; 

import '../../css/styles.css';

export default class AdminHome extends Component {

    render() {
        return (
            <Fragment>
                <section className='containerView'>
                    <h3 className='title'>Digital ID Registry</h3>
                    <form onSubmit={this.props.onSubmit}>
                        <input type='text' name='addr' placeholder='Ethereum Address... '/><br />
                        <input type='text' name='name' placeholder='Name...'/><br />
                        <input type='text' name='gender' placeholder='Gender...'/><br />
                        <input type='text' name='dob' placeholder='DOB...'/><br />
                        <input type='text' name='address' placeholder='Address...'/><br />
                        <input type='text' name='phone' placeholder='Phone Number...'/><br />
                        <input type='submit' name='Search' className='registerbtn'/>
                    </form>
                    <br />
                </section>
            </Fragment>
        );
    }
}